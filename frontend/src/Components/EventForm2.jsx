import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

// Custom styles for the flatpickr
const customFlatpickrStyles = `
  .flatpickr-calendar {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    border-radius: 0.5rem;
    border: 1px solid #e2e8f0;
    font-family: inherit;
    max-width: 300px;
  }
  
  .flatpickr-day.selected, .flatpickr-day.startRange, .flatpickr-day.endRange, .flatpickr-day.selected.inRange, .flatpickr-day.startRange.inRange, .flatpickr-day.endRange.inRange, .flatpickr-day.selected:focus, .flatpickr-day.startRange:focus, .flatpickr-day.endRange:focus, .flatpickr-day.selected:hover, .flatpickr-day.startRange:hover, .flatpickr-day.endRange:hover, .flatpickr-day.selected.prevMonthDay, .flatpickr-day.startRange.prevMonthDay, .flatpickr-day.endRange.prevMonthDay, .flatpickr-day.selected.nextMonthDay, .flatpickr-day.startRange.nextMonthDay, .flatpickr-day.endRange.nextMonthDay {
    background: #6366f1;
    border-color: #6366f1;
  }
  
  .flatpickr-day.selected.startRange + .endRange:not(:nth-child(7n+1)), .flatpickr-day.startRange.startRange + .endRange:not(:nth-child(7n+1)), .flatpickr-day.endRange.startRange + .endRange:not(:nth-child(7n+1)) {
    box-shadow: -10px 0 0 #6366f1;
  }
  
  .flatpickr-time input, .flatpickr-time .flatpickr-time-separator, .flatpickr-time .flatpickr-am-pm {
    height: 38px;
  }
  
  .flatpickr-months {
    background-color: #f3f4f6;
    border-radius: 0.5rem 0.5rem 0 0;
  }
  
  .flatpickr-month {
    height: 40px;
  }
  
  .flatpickr-current-month {
    padding-top: 5px;
  }
`;

const categories = [
    "Music", "Art", "Sports", "Recreation", "Food", "Drink", "Business", "Education",
    "Family", "Kids", "Community", "Parties", "Outdoor", "Nature", "Adventure", "Politics",
    "Government", "Health", "Spirituality", "Shopping", "Fashion", "Travel", "Media", "Cinema",
    "Entertainment", "Career", "Science", "Technology", "Home", "Gardening", "Faith", "Religion",
    "Charity", "Social", "Festivals", "Other"
];

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
    const [imagePath, setImagePath] = useState("");
    const [image, setImage] = useState();
    const [error, setError] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();
    
    // Date Picker
    const datePickerRef = useRef(null);

    // Add the custom styles to the document
    useEffect(() => {
        const styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.innerHTML = customFlatpickrStyles;
        document.head.appendChild(styleElement);
        
        return () => {
            document.head.removeChild(styleElement);
        };
    }, []);
    
    useEffect(() => {
        if (datePickerRef.current) {
            const fp = flatpickr(datePickerRef.current, {
                enableTime: true,
                dateFormat: "Y-m-d H:i",
                time_24hr: true, // Use 24-hour format
                defaultDate: eventDate || undefined,
                minuteIncrement: 15,
                onChange: (selectedDates) => {
                    setEventDate(selectedDates[0].toISOString());
                },
                animate: true,
                closeOnSelect: false,
                position: "auto"
            });
            
            return () => {
                fp.destroy();
            };
        }
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("eventTitle", eventTitle);
        formData.append("eventDescription", eventDescription);
        formData.append("eventDate", eventDate);
        formData.append("eventLocation", eventLocation);
        formData.append("eventCategory", eventCategory);
        formData.append("isFinished", isFinished);
        formData.append("createdBy", createdBy); // TODO: HERE THE ACTUAL ID OF A USER NOT THIS PLACEHOLDER!!!!!
        if (image) {
            formData.append("image", image);
        }

        const url = "http://127.0.0.1:5000/" + (isUpdating ? `update_event/${existingEvent.id}` : "create_event");
        const options = {
            method: isUpdating ? "PATCH" : "POST",
            body: formData,
        };
    
        try {
            const response = await fetch(url, options);
            const data = await response.json();
    
            if (response.ok) {
                navigate('/')
            } else {
                setError(data.message || "An error occurred");
                alert(data.message);
            }
        } catch (error) {
            console.error("Error submitting event:", error);
            setError("Network error. Please try again.");
        }
    };

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setImage(selectedFile);
            
            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen py-8 px-4">
            <section className="max-w-3xl p-8 mx-auto bg-white rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                    {isUpdating ? "Update Event" : "Create Event"}
                </h1>
                
                <form onSubmit={onSubmit} className="space-y-6">
                    {/* First row: Title and Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="eventTitle" className="block text-sm font-medium text-gray-700">
                                Event Title <span className="text-red-500">*</span>
                            </label>
                            <input 
                                id="eventTitle" 
                                type="text" 
                                value={eventTitle} 
                                onChange={(e) => setEventTitle(e.target.value)} 
                                maxLength={50}
                                required
                                placeholder="Enter event title"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="eventLocation" className="block text-sm font-medium text-gray-700">
                                Event Location <span className="text-red-500">*</span>
                            </label>
                            <input 
                                id="eventLocation" 
                                type="text" 
                                value={eventLocation} 
                                onChange={(e) => setEventLocation(e.target.value)} 
                                maxLength={30}
                                required
                                placeholder="Enter location"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                    </div>

                    {/* Second row: Category and Date */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="eventCategory" className="block text-sm font-medium text-gray-700">
                                Event Category <span className="text-red-500">*</span>
                            </label>
                            <select 
                                id="eventCategory" 
                                value={eventCategory} 
                                onChange={(e) => setEventCategory(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="" disabled>Select a category</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">
                                Event Date & Time <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input 
                                    type="text" 
                                    ref={datePickerRef}
                                    placeholder="Select date and time" 
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm 
                                               focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Event Description */}
                    <div className="space-y-2">
                        <label htmlFor="eventDescription" className="block text-sm font-medium text-gray-700">
                            Event Description <span className="text-red-500">*</span>
                        </label>
                        <textarea 
                            id="eventDescription" 
                            value={eventDescription} 
                            onChange={(e) => setEventDescription(e.target.value)} 
                            maxLength={400}
                            required
                            rows={4}
                            placeholder="Describe your event..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                                       focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <p className="text-xs text-gray-500 text-right">
                            {eventDescription.length}/400 characters
                        </p>
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-2">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                            Event Image
                        </label>
                        <div className="flex flex-col items-center space-y-4">
                            {imagePreview && (
                                <div className="mt-2 relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden">
                                    <img 
                                        src={imagePreview} 
                                        alt="Preview" 
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setImagePreview(null);
                                            setImage(null);
                                        }}
                                        className="absolute top-2 right-2 bg-red-500 rounded-full p-1 text-white hover:bg-red-600"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            )}

                            <label className="flex flex-col items-center px-4 py-6 w-full text-center bg-white rounded-lg shadow-sm border border-gray-300 border-dashed cursor-pointer hover:bg-gray-50 transition-all">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <span className="mt-2 text-sm font-medium text-gray-600">
                                    {!imagePreview ? "Drop image here or click to upload" : "Change image"}
                                </span>
                                <span className="mt-1 text-xs text-gray-500">
                                    PNG, JPG, GIF up to 10MB
                                </span>
                                <input 
                                    id="image" 
                                    type="file" 
                                    accept="image/*" 
                                    className="hidden" 
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-end">
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="mr-4 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all
                                ${error ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={!!error}
                        >
                            {isUpdating ? "Update Event" : "Create Event"}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default EventForm;