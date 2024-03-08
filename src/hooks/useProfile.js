import { useContext } from "react";
import { ProfileContext } from "../context";

export default function useProfile() {
    return useContext(ProfileContext)
}