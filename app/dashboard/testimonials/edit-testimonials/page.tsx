"use client"
import TestimonialForm from '../components/testimonials-form'
import { useAppSelector } from '@/redux/hooks'

const EditTestimonialsPage = () => {
    const {selectedData} = useAppSelector((state)=>state.authentication);

  return (
    <div>
      <TestimonialForm initialData={selectedData} />
    </div>
  )
}

export default EditTestimonialsPage
