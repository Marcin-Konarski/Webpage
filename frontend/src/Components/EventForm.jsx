import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { English } from "flatpickr/dist/l10n/default.js";

const categories = [
    "Music", "Art", "Sports", "Recreation", "Food", "Drink", "Business", "Education",
    "Family", "Kids", "Community", "Parties", "Outdoor", "Nature", "Adventure", "Politics",
    "Government", "Health", "Spirituality", "Shopping", "Fashion", "Travel", "Media", "Cinema",
    "Entertainment", "Career", "Science", "Technology", "Home", "Gardening", "Faith", "Religion",
    "Charity", "Social", "Festivals", "Other"
];

const customFlatpickrStyles = `
/* Overall calendar appearance */
.flatpickr-calendar {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  font-family: inherit;
  max-width: 290px;
  padding: 8px;
}

/* Month container styling */
.flatpickr-months {
  border-radius: 6px 6px 0 0;
  margin-bottom: 8px;
  text-align: center; /* Center the month/year container */
}

.flatpickr-month {
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center; /* Center the month/year content */
}

/* Month/year selection buttons */
.flatpickr-current-month {
  display: flex;
  align-items: center;
  justify-content: center; /* Center the contents */
  height: 34px;
  padding: 0;
  width: 100%; /* Ensure it takes full width for centering */
  left: 0; /* Reset any possible positioning */
  position: relative;
}

.flatpickr-current-month .numInputWrapper {
  margin-left: 5px;
}

.flatpickr-current-month .flatpickr-monthDropdown-months,
.flatpickr-current-month input.cur-year {
  border: none;
  padding: 2px 5px;
  font-weight: 500;
  font-size: 1.5rem;
  height: 28px;
  color: black;
  text-align: center; /* Center text in dropdowns */
}

.flatpickr-current-month .flatpickr-monthDropdown-months {
  appearance: none;
  -webkit-appearance: none;
  padding-right: 20px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 4px center;
  background-size: 14px;
}

/* Navigation arrows */
.flatpickr-months .flatpickr-prev-month,
.flatpickr-months .flatpickr-next-month {
  height: 34px;
  width: 34px;
  margin: 8px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: background 0.2s;
  top: 0; /* Align with the top of the month container */
}

.flatpickr-months .flatpickr-prev-month:hover,
.flatpickr-months .flatpickr-next-month:hover {
  background: #e2e8f0;
}

.flatpickr-months .flatpickr-prev-month svg,
.flatpickr-months .flatpickr-next-month svg {
  width: 16px;
  height: 16px;
}

/* Selected day styling */
.flatpickr-day.selected,
.flatpickr-day.startRange,
.flatpickr-day.endRange {
  background: #6366f1;
  border-color: #6366f1;
  box-shadow: none;
}

.flatpickr-day.selected:hover {
  background: #4f46e5;
  border-color: #4f46e5;
}

/* Time container and inputs */
.flatpickr-time {
  height: 40px;
  border-top: 1px solid #e2e8f0;
  margin-top: 8px;
  border-radius: 0 0 6px 6px;
}

.flatpickr-time .numInputWrapper {
  height: 38px;
  flex: 1;
}

/* Hide the up/down arrows for time inputs */
.flatpickr-time .numInputWrapper span.arrowUp,
.flatpickr-time .numInputWrapper span.arrowDown {
  display: none !important;
}

.flatpickr-time .numInputWrapper input {
  font-size: 1rem;
  font-weight: 500;
  color: #4b5563;
  background: transparent;
  text-align: center; /* Center the time text */
}

.flatpickr-time .flatpickr-time-separator {
  color: #6b7280;
  font-weight: bold;
}

/* Today indicator */
.flatpickr-day.today {
  border-color: #e2e8f0;
  font-weight: bold;
}

.flatpickr-day.today:hover {
  background: #f1f5f9;
  border-color: #e2e8f0;
}

/* Animation for calendar */
.flatpickr-calendar.animate.open {
  animation: fpFadeInDown 200ms ease-out;
}

@keyframes fpFadeInDown {
  from {
    opacity: 0;
    transform: translate3d(0, -10px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
`;


const EventForm = ({ isUpdating = false }) => {
    const location = useLocation();
    const { existingEvent = {} } = location.state || {};

    const [eventTitle, setEventTitle] = useState(existingEvent?.eventTitle || "");
    const [eventDescription, setEventDescription] = useState(existingEvent?.eventDescription || "");
    const [eventDate, setEventDate] = useState(existingEvent?.eventDate || "");
    const [eventLocation, setEventLocation] = useState(existingEvent?.eventLocation || "");
    const [eventCategory, setEventCategory] = useState(existingEvent?.eventCategory || "");
    const [isFinished, setIsFinished] = useState(existingEvent?.isFinished || false);
    const [createdBy, setCreatedBy] = useState(existingEvent?.createdBy || 0);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState({});

    const navigate = useNavigate();
    const datePickerRef = useRef(null);

    useEffect(() => {
        if (datePickerRef.current) {
            const fp = flatpickr(datePickerRef.current, {
                enableTime: true,
                dateFormat: "Y-m-d H:i",
                time_24hr: true,
                defaultDate: eventDate || undefined,
                minuteIncrement: 15,
                locale: {
                    ...English,
                    firstDayOfWeek: 1, // Monday as first day
                },
                onChange: (selectedDates) => {
                    setEventDate(selectedDates[0]?.toISOString());
                }
            });

            return () => fp.destroy();
        }
    }, []);

    const validateForm = () => {
        const newErrors = {};

        if (!eventTitle.trim()) newErrors.eventTitle = "Title is required";
        if (!eventDescription.trim()) newErrors.eventDescription = "Description is required"; // ✅ ADD THIS
        if (!eventLocation.trim()) newErrors.eventLocation = "Location is required";
        if (!eventCategory) newErrors.eventCategory = "Category is required";
        if (!eventDate) newErrors.eventDate = "Date is required";

        if (!image) {
            newErrors.image = "Image is required";
        } else {
            const allowedTypes = ["image/jpeg", "image/png"];
            if (!allowedTypes.includes(image.type)) {
                newErrors.image = "Only JPG or PNG files are allowed";
            }
        }

        return newErrors;
    };


    const onSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        setError(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        const formData = new FormData();
        formData.append("eventTitle", eventTitle);
        formData.append("eventDescription", eventDescription);
        formData.append("eventDate", eventDate);
        formData.append("eventLocation", eventLocation);
        formData.append("eventCategory", eventCategory);
        formData.append("isFinished", isFinished);
        formData.append("createdBy", createdBy);
        if (image) formData.append("image", image);

        const url = `http://127.0.0.1:5000/${isUpdating ? `update_event/${existingEvent.id}` : "create_event"}`;
        const options = {
            method: isUpdating ? "PATCH" : "POST",
            body: formData
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();

            if (response.ok) {
                navigate('/');
            } else {
                alert(data.message || "An error occurred");
            }
        } catch (error) {
            console.error("Error submitting event:", error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImage(null);
        setImagePreview(null);
    };

    return (<>
        <section className="max-w-4xl p-6 mx-auto bg-gray-50 rounded-lg shadow-md mt-20">
            <h1 className="text-3xl font-extrabold text-black capitalize ">Create Event</h1>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                
                {/* Title and Location */}
                <div>
                    <label htmlFor="eventTitle" className="font-bold text-lg text-black">Event Title</label>
                    <input id="eventTitle" type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} 
                        maxLength={50} placeholder="Enter event title" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-transparent
                        border border-black rounded-sm focus:border-black focus:outline-purple-700 focus-ring" />
                    {error.eventTitle && (
                        <p className="text-red-500 text-sm mt-1">{error.eventTitle}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="eventLocation" className="font-bold text-lg text-black">Event Location</label>
                    <input id="eventLocation" type="text" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} 
                        maxLength={30} placeholder="Enter event location" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-transparent
                        border border-black rounded-sm focus:border-black focus:outline-purple-700 focus-ring" />
                    {error.eventLocation && (
                        <p className="text-red-500 text-sm mt-1">{error.eventLocation}</p>
                    )}
                </div>


                {/* Category and Date */}
                <div>
                    <label htmlFor="eventCategory" className="font-bold text-lg text-black">Select Category</label>
                    <select id="eventCategory" value={eventCategory} onChange={(e) => setEventCategory(e.target.value)}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-transparent border border-black
                        rounded-sm focus:border-black focus:outline-purple-700 focus-ring">
                        <option value="" disabled>Select Category</option>
                        {categories.map((category) => <option key={category} value={category}>{category}</option>)}
                    </select>
                    {error.eventCategory && (
                        <p className="text-red-500 text-sm mt-1">{error.eventCategory}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="eventDate" className="font-bold text-lg text-black">Event Date</label>
                    <input type="text" ref={datePickerRef} placeholder="Select date and time"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-transparent border border-black
                        rounded-sm focus:border-black focus:outline-purple-700 focus-ring" />
                    {error.eventDate && (
                        <p className="text-red-500 text-sm mt-1">{error.eventDate}</p>
                    )}
                </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4 mt-8">
                <div>
                    <label htmlFor="eventDescription" className="font-bold text-lg text-black">Event Description</label>
                    <textarea id="eventDescription" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} 
                        maxLength={400} placeholder="Describe what your event is about..." style={{ resize: 'none', height: '100px' }} // Fixed height, no resize
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-transparent border border-black
                        rounded-sm focus:border-black focus:outline-purple-700 focus-ring" />
                        <div className="text-right text-sm text-gray-500 mt-1">
                            {eventDescription.length}/400
                        </div>
                    {error.eventDescription && (
                        <p className="text-red-500 text-sm mt-1">{error.eventDescription}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="eventImage" className="font-bold text-lg text-black">Select Image</label>
                    
                    {/* Image preview area */}
                    {imagePreview && (
                        <div className="mt-2 mb-3 border border-gray-300 p-2 rounded-sm">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-600">Upload Image</span>
                                <button type="button" onClick={removeImage} className="text-red-500 text-sm hover:text-red-700">
                                    Remove
                                </button>
                            </div>
                            <img src={imagePreview} alt="Preview" className="max-h-40 mx-auto"/>
                        </div>
                    )}
                    
                    {/* Image upload button */}
                    <label className="block w-full px-4 py-2 mt-2 text-gray-700 bg-transparent border border-black
                        rounded-sm focus:border-black focus:outline-purple-700 focus-ring">
                        <span className="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <span className="font-medium text-gray-600">
                                {imagePreview ? "Change image" : "Drop files or Browse"}
                            </span>
                        </span>
                        <input type="file" accept="image/*" name="image" className="hidden" onChange={handleImageChange} />
                    </label>
                    {error.image && (
                            <p className="text-red-500 text-sm mt-1">{error.image}</p>
                        )}
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-end mt-8">
                <button type="button" onClick={() => navigate('/')}
                    className="mr-4 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700
                    hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Cancel
                </button>
                <button type="submit" className={`py-2 px-6 border border-transparent rounded-md shadow-sm text-sm
                    font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none transition-all`}
                    onClick={onSubmit}> {/* ${Object.keys(error).length > 0 ? 'opacity-50 cursor-not-allowed' : ''} */}
                    {isUpdating ? "Update Event" : "Create Event"}
                </button>
            </div>
        </section>
    </>);
};

export default EventForm;