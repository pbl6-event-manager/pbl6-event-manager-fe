import type { Dispatch } from "redux";
import type { OrganizerProfile, OrganizerFormData } from "../../../models/organizer-models";


//Action Types
export const ORGANIZER_ACTIONS = {
  FETCH_ORGANIZERS_REQUEST : "FETCH_ORGANIZERS_REQUEST",
  FETCH_ORGANIZERS_SUCCESS : "FETCH_ORGANIZERS_SUCCESS",
  FETCH_ORGANIZERS_FAILURE : "FETCH_ORGANIZERS_FAILURE",

  FETCH_ORGANIZER_DETAIL_REQUEST : "FETCH_ORGANIZER_DETAIL_REQUEST",
  FETCH_ORGANIZER_DETAIL_SUCCESS : "FETCH_ORGANIZER_DETAIL_SUCCESS",
  FETCH_ORGANIZER_DETAIL_FAILURE : "FETCH_ORGANIZER_DETAIL_FAILURE",

  CREATE_ORGANIZER_REQUEST : "CREATE_ORGANIZER_REQUEST",
  CREATE_ORGANIZER_SUCCESS : "CREATE_ORGANIZER_SUCCESS",
  CREATE_ORGANIZER_FAILURE : "CREATE_ORGANIZER_FAILURE",

  UPDATE_ORGANIZER_REQUEST : "UPDATE_ORGANIZER_REQUEST",
  UPDATE_ORGANIZER_SUCCESS : "UPDATE_ORGANIZER_SUCCESS",
  UPDATE_ORGANIZER_FAILURE : "UPDATE_ORGANIZER_FAILURE",

  DELETE_ORGANIZER_REQUEST : "DELETE_ORGANIZER_REQUEST",
  DELETE_ORGANIZER_SUCCESS : "DELETE_ORGANIZER_SUCCESS",
  DELETE_ORGANIZER_FAILURE : "DELETE_ORGANIZER_FAILURE",

  FOLLOW_ORGANIZER_REQUEST : "FOLLOW_ORGANIZER_REQUEST",
  FOLLOW_ORGANIZER_SUCCESS : "FOLLOW_ORGANIZER_SUCCESS",
  FOLLOW_ORGANIZER_FAILURE : "FOLLOW_ORGANIZER_FAILURE",
} as const

//Action Creators
//Fetch Organizers
export const fetchOrganizers = () => async (dispatch: Dispatch) => {
  dispatch({ type: ORGANIZER_ACTIONS.FETCH_ORGANIZERS_REQUEST })
  try {
    // TODO: Replace with actual API call
    const mockOrganizers: OrganizerProfile[] = [
      {
        id: "1",
        name: "Unnamed organizer",
        isUnnamed: true,
        emailOptIn: false,
        pageUrl: "unnamed-organizer",
        followerCount: 0,
        eventCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "2",
        name: "An Lê",
        website: "https://anle.com",
        isUnnamed: false,
        emailOptIn: false,
        pageUrl: "an-le-115368569221",
        followerCount: 150,
        eventCount: 5,
        profileImage: "/images/anle.jpg",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "3",
        name: "Tâm",
        website: "https://tam.com",
        isUnnamed: false,
        emailOptIn: false,
        pageUrl: "tam",
        followerCount: 80,
        eventCount: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]
    dispatch({
      type: ORGANIZER_ACTIONS.FETCH_ORGANIZERS_SUCCESS,
      payload: mockOrganizers,
    })
  } catch (error) {
    dispatch({
      type: ORGANIZER_ACTIONS.FETCH_ORGANIZERS_FAILURE,
      payload: error instanceof Error ? error.message : "Failed to fetch organizers",
    })
  }
}

//Fetch Organizer Detail
export const fetchOrganizerDetail = (organizerId: string) => async (dispatch: Dispatch) => {
  dispatch({ type: ORGANIZER_ACTIONS.FETCH_ORGANIZER_DETAIL_REQUEST })
  try {
    // TODO: Replace with actual API call
    const mockOrganizer: OrganizerProfile = {
      id: organizerId,
      name: "An Lê",
      website: "https://anle.com",
      bio: "Event organizer passionate about creating memorable experiences",
      description: "We organize amazing events",
      facebookId: "1529838090599318",
      twitter: "EventbriteLife",
      isUnnamed: false,
      emailOptIn: false,
      pageUrl: "an-le-115368569221",
      followerCount: 150,
      eventCount: 5,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    dispatch({
      type: ORGANIZER_ACTIONS.FETCH_ORGANIZER_DETAIL_SUCCESS,
      payload: mockOrganizer,
    })
  } catch (error) {
    dispatch({
      type: ORGANIZER_ACTIONS.FETCH_ORGANIZERS_FAILURE,
      payload: error instanceof Error ? error.message : "Failed to fetch organizer",
    })
  }
}

//Create Organizer
export const createOrganizer = (data: OrganizerFormData) => async (dispatch: Dispatch) => {
  dispatch({ type: ORGANIZER_ACTIONS.CREATE_ORGANIZER_REQUEST})
  try {
    // TODO: Replace with actual API call
    const newOrganizer: OrganizerProfile = {
      id: Date.now().toString(),
      name: data.name,
      website: data.website,
      bio: data.bio,
      description: data.description,
      facebookId: data.facebookId,
      twitter: data.twitter,
      emailOptIn: data.emailOptIn,
      isUnnamed: false,
      pageUrl: data.name.toLowerCase().replace(/\s+/g, "-"),
      followerCount: 0,
      eventCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    dispatch({
      type: ORGANIZER_ACTIONS.CREATE_ORGANIZER_SUCCESS,
      payload: newOrganizer,
    })
    return newOrganizer
  } catch (error) {
    dispatch({
      type: ORGANIZER_ACTIONS.CREATE_ORGANIZER_FAILURE,
      payload: error instanceof Error ? error.message : "Failed to create organizer",
    })
    throw error
  }
}

//Update Organizer
export const updateOrganizer = (organizerId: string, data: OrganizerFormData) => async (dispatch: Dispatch) => {
  dispatch({ type: ORGANIZER_ACTIONS.UPDATE_ORGANIZER_REQUEST })
  try {
    // TODO: Replace with actual API call
    const updatedOrganizer: OrganizerProfile = {
      id: organizerId,
      name: data.name,
      website: data.website,
      bio: data.bio,
      description: data.description,
      facebookId: data.facebookId,
      twitter: data.twitter,
      emailOptIn: data.emailOptIn,
      isUnnamed: false,
      pageUrl: data.name.toLowerCase().replace(/\s+/g, "-"),
      followerCount: 150,
      eventCount: 5,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    dispatch({
      type: ORGANIZER_ACTIONS.UPDATE_ORGANIZER_SUCCESS,
      payload: updatedOrganizer,
    })
    return updatedOrganizer
  } catch (error) {
    dispatch({
      type: ORGANIZER_ACTIONS.UPDATE_ORGANIZER_FAILURE,
      payload: error instanceof Error ? error.message : "Failed to update organizer",
    })
    throw error
  }
}

//Delete Organizer
export const deleteOrganizer = (organizerId: string) => async (dispatch: Dispatch) => {
  dispatch({ type: ORGANIZER_ACTIONS.DELETE_ORGANIZER_REQUEST })
  try {
    // TODO: Replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    dispatch({
      type: ORGANIZER_ACTIONS.DELETE_ORGANIZER_SUCCESS,
      payload: organizerId,
    })
  } catch (error) {
    dispatch({
      type: ORGANIZER_ACTIONS.DELETE_ORGANIZER_FAILURE,
      payload: error instanceof Error ? error.message : "Failed to delete organizer",
    })
    throw error
  }
}

//Follow Organizer
export const followOrganizer = (organizerId: string) => async (dispatch: Dispatch) => {
  dispatch({ type: ORGANIZER_ACTIONS.FETCH_ORGANIZERS_REQUEST})
  try {
    // TODO: Replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    dispatch({
      type: ORGANIZER_ACTIONS.FOLLOW_ORGANIZER_SUCCESS,
      payload: organizerId,
    })
  } catch (error) {
    dispatch({
      type: ORGANIZER_ACTIONS.FOLLOW_ORGANIZER_FAILURE,
      payload: error instanceof Error ? error.message : "Failed to follow organizer",
    })
    throw error
  }
}