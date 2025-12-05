import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../store/store";
import {
    createANewTicketAction,
    getTicketsByEventIdAction,
    getTicketByIdAction,
    updateTicketByIdAction,
    deleteTicketByIdAction
} from "../../../store/actions/ticket-action";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { TicketFormData, TicketListItem } from "../../../models/form-models/ticket-form-models"
import { closeLoadingAlert, showErrorAlert, showLoadingAlert, showSuccessAlert, showConfirmAlert } from "../../../helpers/alert-helpers";
import { convertFormDataToCreateRequest, convertToTicketListItem, convertToTicketFormData } from "../../../converters/ticket-converter";

export const useTicketViewModel = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()
    const { eventId } = useParams<{ eventId: string }>();
    const { tickets: ticketsDto, currentTicket: currentTicketDto, isLoading, error } = useSelector(
        (state: RootState) => state.ticketReducer
    );
    // const currentStep = 2
    const [showTicketForm, setShowTicketForm] = useState(false)
    const [showTicketTypeSelection, setShowTicketTypeSelection] = useState(false)
    const [selectedTicketType, setSelectedTicketType] = useState<"paid" | "free" | null>(null)
    const [tickets, setTickets] = useState<TicketListItem[]>([])
    const [filteredTickets, setFilteredTickets] = useState<TicketListItem[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [showCurrencyDialog, setShowCurrencyDialog] = useState(false)
    const [currency, setCurrency] = useState({ country: "United States", code: "USD" })
    const [editingTicketId, setEditingTicketId] = useState<number | null>(null);

    const [ticketFormData, setTicketFormData] = useState<TicketFormData>({
        name: "",
        type: "paid",
        price: 0,
        currency: "USD",
        availableQuantity: 0,
        salesStart: new Date().toISOString().split("T")[0],
        salesStartTime: "12:00 AM",
        salesEnd: "",
        salesEndTime: "12:00 PM",
        description: "",
        visibility: "visible",
        minQuantity: 1,
        maxQuantity: 10,
        salesChannel: "everywhere",
        eTicket: true,
        willCall: false,
    });
    const handleLoadTickets = async () => {
        if (!eventId) return;

        try {
            showLoadingAlert("Loading tickets...");
            await dispatch(getTicketsByEventIdAction(Number(eventId)));
            closeLoadingAlert();
        } catch (err: any) {
            closeLoadingAlert();
            console.error("[TicketViewModel] Load tickets error:", err);
            // Don't show error alert for initial load
        }
    };
    // Load tickets when component mounts or eventId changes
    useEffect(() => {
        handleLoadTickets()
    }, [eventId, dispatch]);

    useEffect(() => {
        const ticketListItems = ticketsDto.map(convertToTicketListItem);
        setTickets(ticketListItems);
    }, [ticketsDto]);

    useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredTickets(tickets);
        } else {
            const query = searchQuery.toLowerCase();
            const filtered = tickets.filter(ticket =>
                ticket.nameTicket.toLowerCase().includes(query) ||
                ticket.price.toString().includes(query) ||
                ticket.ticketID.toString().includes(query)
            );
            setFilteredTickets(filtered);
        }
    }, [searchQuery, tickets]);


    const handleTicketTypeSelect = (type: "paid" | "free") => {
        setSelectedTicketType(type)
        setTicketFormData({
            ...ticketFormData,
            type,
            price: type === "free" ? 0 : ticketFormData.price,
        })

        // Show currency dialog for paid tickets on first ticket creation
        if (type === "paid" && tickets.length === 0) {
            setShowCurrencyDialog(true)
        } else {
            setShowTicketTypeSelection(false)
            setShowTicketForm(true)
        }
    }

    const handleAddMoreTickets = () => {
        setShowTicketTypeSelection(true)
        setSelectedTicketType(null)
        setShowTicketForm(false)
        setShowCurrencyDialog(false)
    }

    const handleCurrencyConfirm = () => {
        setShowCurrencyDialog(false)
        setShowTicketTypeSelection(false)
        setShowTicketForm(true)
    }

    const handleEditTicket = async (ticketId: number) => {
        if (!eventId) return;

        try {
            showLoadingAlert("Loading ticket...");
            await dispatch(getTicketByIdAction(Number(eventId), Number(ticketId)));
            
            closeLoadingAlert();
            if (currentTicketDto !== null) {
                // Convert ticket DTO to form data
                const formData = convertToTicketFormData(currentTicketDto);
                setTicketFormData(formData);
                setSelectedTicketType(formData.type);
                setEditingTicketId(Number(ticketId));
                setShowTicketForm(true);
            }


        } catch (err: any) {
            closeLoadingAlert();
            console.error("[TicketViewModel] Load ticket error:", err);
            showErrorAlert("Failed to load ticket", err.message);
        }
    };

    const handleUpdateTicket = async () => {
        if (!eventId || !editingTicketId) {
            showErrorAlert("Missing required information");
            return;
        }

        // Validate form
        if (!ticketFormData.name.trim()) {
            showErrorAlert("Please enter ticket name");
            return;
        }

        if (ticketFormData.availableQuantity <= 0) {
            showErrorAlert("Please enter valid quantity");
            return;
        }

        if (!ticketFormData.salesStart || !ticketFormData.salesEnd) {
            showErrorAlert("Please select sales period");
            return;
        }

        try {
            showLoadingAlert("Updating ticket...");

            const requestData = convertFormDataToCreateRequest(Number(eventId), ticketFormData);

            await dispatch(updateTicketByIdAction(Number(eventId), editingTicketId,requestData));

            closeLoadingAlert();
            showSuccessAlert("Ticket updated successfully!");

            // Reset and reload
            setShowTicketForm(false);
            setEditingTicketId(null);
            setSelectedTicketType(null);
            setTicketFormData({
                name: "",
                type: "paid",
                price: 0,
                currency: "USD",
                availableQuantity: 0,
                salesStart: new Date().toISOString().split("T")[0],
                salesStartTime: "12:00",
                salesEnd: "",
                salesEndTime: "23:59",
                description: "",
                visibility: "visible",
                minQuantity: 1,
                maxQuantity: 10,
                salesChannel: "everywhere",
                eTicket: true,
                willCall: false,
            });

            await dispatch(getTicketsByEventIdAction(Number(eventId)));

        } catch (err: any) {
            closeLoadingAlert();
            console.error("[TicketViewModel] Update ticket error:", err);
            showErrorAlert("Failed to update ticket", err.message);
        }
    };

    const handleDeleteTicket = async (ticketId: number) => {
        if (!eventId) return;

        const confirmed = await showConfirmAlert(
            "Delete Ticket",
            "Are you sure you want to delete this ticket? This action cannot be undone."
        );

        if (!confirmed) return;

        try {
            showLoadingAlert("Deleting ticket...");
            await dispatch(deleteTicketByIdAction(Number(eventId), Number(ticketId)));

            closeLoadingAlert();
            showSuccessAlert("Ticket deleted successfully!");

            await dispatch(getTicketsByEventIdAction(Number(eventId)));

        } catch (err: any) {
            closeLoadingAlert();
            console.error("[TicketViewModel] Delete ticket error:", err);
            showErrorAlert("Failed to delete ticket", err.message);
        }
    };

    const handleSaveTicket = async () => {
        if (editingTicketId) {
            await handleUpdateTicket();
        } else {
            if (!eventId) {
                showErrorAlert("Event ID is missing");
                return;
            }

            if (!ticketFormData.name.trim()) {
                showErrorAlert("Please enter ticket name");
                return;
            }

            if (ticketFormData.availableQuantity <= 0) {
                showErrorAlert("Please enter valid quantity");
                return;
            }

            if (!ticketFormData.salesStart || !ticketFormData.salesEnd) {
                showErrorAlert("Please select sales period");
                return;
            }

            try {
                showLoadingAlert("Creating ticket...");

                const requestData = convertFormDataToCreateRequest(Number(eventId), ticketFormData);

                await dispatch(createANewTicketAction(Number(eventId), requestData));

                closeLoadingAlert();
                showSuccessAlert("Ticket created successfully!");

                setShowTicketForm(false);
                setSelectedTicketType(null);
                setShowTicketTypeSelection(false);

                setTicketFormData({
                    name: "",
                    type: "paid",
                    price: 0,
                    currency: "USD",
                    availableQuantity: 0,
                    salesStart: new Date().toISOString().split("T")[0],
                    salesStartTime: "12:00",
                    salesEnd: "",
                    salesEndTime: "23:59",
                    description: "",
                    visibility: "visible",
                    minQuantity: 1,
                    maxQuantity: 10,
                    salesChannel: "everywhere",
                    eTicket: true,
                    willCall: false,
                });

                await dispatch(getTicketsByEventIdAction(Number(eventId)));
            } catch (err: any) {
                closeLoadingAlert();
                console.error("[TicketViewModel] Create ticket error:", err);
                showErrorAlert("Failed to create ticket", err.message);
            }
        }
    };

    const handleCancel = () => {
        setShowTicketForm(false);
        setSelectedTicketType(null);
        setShowTicketTypeSelection(false);
        setEditingTicketId(null);
        // Reset form data
        setTicketFormData({
            name: "",
            type: "paid",
            price: 0,
            currency: "USD",
            availableQuantity: 0,
            salesStart: new Date().toISOString().split("T")[0],
            salesStartTime: "12:00",
            salesEnd: "",
            salesEndTime: "23:59",
            description: "",
            visibility: "visible",
            minQuantity: 1,
            maxQuantity: 10,
            salesChannel: "everywhere",
            eTicket: true,
            willCall: false,
        });
    };
    return {
        navigate,
        eventId,
        showTicketForm,
        setShowTicketForm,
        showTicketTypeSelection,
        setShowTicketTypeSelection,
        selectedTicketType,
        setSelectedTicketType,
        tickets,
        setTickets,
        filteredTickets,
        searchQuery,
        setSearchQuery,
        ticketFormData,
        setTicketFormData,
        showCurrencyDialog,
        setShowCurrencyDialog,
        currency,
        setCurrency,
        isLoading,
        error,
        handleTicketTypeSelect,
        handleCurrencyConfirm,
        handleAddMoreTickets,
        handleSaveTicket,
        handleCancel,
        editingTicketId,
        handleEditTicket,
        handleDeleteTicket,
    }
}