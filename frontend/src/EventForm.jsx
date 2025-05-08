import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "./label";
import { Input } from "./input";
import { Button } from "./button";
import { parseISO, isValid } from "date-fns";

const categories = [
    "Music", "Art", "Sports", "Recreation", "Food", "Drink", "Business", "Education",
    "Family", "Kids", "Community", "Parties", "Outdoor", "Nature", "Adventure", "Politics",
    "Government", "Health", "Spirituality", "Shopping", "Fashion", "Travel", "Media", "Cinema",
    "Entertainment", "Career", "Science", "Technology", "Home", "Gardening", "Faith", "Religion",
    "Charity", "Social", "Festivals", "Other"
];

const schema = z.object({
    eventTitle: z.string().min(3, { message: "Title must be at least 3 characters" }),
    eventDescription: z.string().min(6, { message: "Description must be at least 6 characters" }),
    eventLocation: z.string().min(3, { message: "Location must be at least 3 characters" }),
    eventDate: z.string().refine((value) => {
        const parsedDate = parseISO(value);
        return isValid(parsedDate);
    }, { message: "Invalid date format" }),
    eventCategory: z.string().min(1, { message: "Category is required" }),
    imagePath: z.optional(),
});

const EventForm = ({ existingEvent = {}, updateCallBack }) => {
    const [image, setImage] = useState(null);
    const updating = Object.entries(existingEvent).length !== 0;

    const { register, handleSubmit, formState: { errors, isSubmitting }, setError, clearErrors, reset } = useForm({
        resolver: zodResolver(schema),
        mode: "onBlur", // onSubmit
    });

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("eventTitle", data.eventTitle);
        formData.append("eventDescription", data.eventDescription);
        formData.append("eventDate", new Date(data.eventDate).toISOString());   // TODO: Ensure ISO format with timezone
        formData.append("eventLocation", data.eventLocation);
        formData.append("eventCategory", data.eventCategory);
        formData.append("isFinished", false);
        formData.append("createdBy", 1);        // TODO: What does this do?
        if (image) {
            formData.append("image", image);
        }

        const url = `http://127.0.0.1:5000/${updating ? `update_event/${existingEvent.id}` : "create_event"}`;
        const options = {
            method: updating ? "PATCH" : "POST",
            body: formData,
        };

        try {
            const response = await fetch(url, options);
            const responseData = await response.json();

            if (response.ok) {
                updateCallBack();
            } else {
                alert(responseData.message);
            }
        } catch (error) {
            console.error("Error submitting event:", error);
        }
    };

    const handleImageChange = (e) => {
        let file = e.target.files[0];
        if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
            setImage(file);
            clearErrors("imagePath");
        } else {
            setImage(null)
            setError("imagePath", {
                type: "manual",
                message: "Only .jpg and .png files are allowed."
            });
        }
    };

    return (
        <div className="flex items-center justify-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-6"
            >
                <h2 className="text-2xl font-semibold text-center mb-4">{updating ? "Update Event" : "Create Event"}</h2>

                <div className="space-y-2">
                    <Label htmlFor="eventTitle">Title</Label>
                    <Input
                        id="eventTitle"
                        {...register("eventTitle")}
                        defaultValue={existingEvent.eventTitle || ""}
                        disabled={isSubmitting}
                        className={errors.eventTitle ? "border-red-500" : ""}
                    />
                    {errors.eventTitle && (
                        <span className="text-sm text-red-600">{errors.eventTitle.message}</span>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="eventDescription">Description</Label>
                    <Input
                        id="eventDescription"
                        {...register("eventDescription")}
                        defaultValue={existingEvent.eventDescription || ""}
                        disabled={isSubmitting}
                        className={errors.eventDescription ? "border-red-500" : ""}
                    />
                    {errors.eventDescription && (
                        <span className="text-sm text-red-600">{errors.eventDescription.message}</span>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="eventLocation">Location</Label>
                    <Input
                        id="eventLocation"
                        {...register("eventLocation")}
                        defaultValue={existingEvent.eventLocation || ""}
                        disabled={isSubmitting}
                        className={errors.eventLocation ? "border-red-500" : ""}
                    />
                    {errors.eventLocation && (
                        <span className="text-sm text-red-600">{errors.eventLocation.message}</span>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="eventDate">Date</Label>
                    <Input
                        id="eventDate"
                        type="datetime-local"
                        {...register("eventDate")}
                        defaultValue={existingEvent.eventDate || ""}
                        disabled={isSubmitting}
                        className={errors.eventDate ? "border-red-500" : ""}
                    />
                    {errors.eventDate && (
                        <span className="text-sm text-red-600">{errors.eventDate.message}</span>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="eventCategory">Category</Label>
                    <select
                        id="eventCategory"
                        {...register("eventCategory")}
                        defaultValue={existingEvent.eventCategory || ""}
                        disabled={isSubmitting}
                        className={`w-full p-2 border rounded ${errors.eventCategory ? "border-red-500" : ""}`}
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    {errors.eventCategory && (
                        <span className="text-sm text-red-600">{errors.eventCategory.message}</span>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="imagePath">Image</Label>
                    <input
                        id="imagePath"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        disabled={isSubmitting}
                        className={errors.imagePath ? "border-red-500" : ""}
                    />
                    {errors.imagePath && (
                        <span className="text-sm text-red-600">{errors.imagePath.message}</span>
                    )}
                </div>

                <Button type="submit" disabled={isSubmitting ||
                                                errors.eventTitle ||
                                                errors.eventDescription ||
                                                errors.eventLocation ||
                                                errors.eventDate ||
                                                errors.eventCategory ||
                                                errors.imagePath} className="w-full">
                    {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
            </form>
        </div>
    );
};

export default EventForm;