import { Button } from "../../../components/ui/button"
import { useNavigate } from "react-router-dom"

export default function VoucherListPage() {
  const navigate = useNavigate();

  const handleAddVouchers = () => {
    navigate("/organizer/vouchers/create");
  }
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold">Vouchers</h1>
      <Button
        className="bg-[#f05537] hover:bg-[#d63c1f] text-white"
        onClick={handleAddVouchers}
      >
        Add more vouchers
      </Button>
    </div>
  )
}