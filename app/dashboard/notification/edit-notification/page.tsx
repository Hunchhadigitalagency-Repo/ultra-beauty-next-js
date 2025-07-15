"use client"

import { useAppSelector } from "@/redux/hooks"
import NotificationForm from "../components/notification-form";

const EditNotificationPage = () => {

    const {selectedData} = useAppSelector((state)=>state.authentication);


  return (
    <div>
      <NotificationForm initialData={selectedData} />
    </div>
  )
}

export default EditNotificationPage
