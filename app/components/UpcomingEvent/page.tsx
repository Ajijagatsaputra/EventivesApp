"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

interface Event {
  id: number;
  createdAt: string;
  updatedAt: string;
  eventName: string;
  eventDateStart: string;
  eventDateEnd: string;
  eventStatus: boolean;
  eventSeatMax: number;
  eventSeatCount: number;
  eventLogo: string;
  description: string;
  userId: number;
  eventCategoryId: number;
  eventLocation: string;
  eventType: string;
}

export default function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // const [locationFilter, setLocationFilter] = useState("");
  const [eventTypeFilter, setEventTypeFilter] = useState("");
  const [anyCategory, setAnyCategory] = useState("");

  // const locationOptions = ["New York", "San Francisco", "Los Angeles"];
  const eventTypeOptions = ["Music", "Exhibition", "Meetup"];
  const anyCtegoryOptions = ["Music", "Exhibition", "Meetup"];

  const fetchEvents = async (pageNum = 1) => {
    try {
      setLoading(true);
      setNotFound(false);
      const response = await axios.get(
        `https://eventives-ylkmb1ps.b4a.run/events/upcoming?page=${pageNum}`,
        {
          params: {
            // location: locationFilter,
            eventType: eventTypeFilter,
          },
        }
      );

      const newEvents = response.data;
      if (newEvents.length === 0) {
        setHasMore(false);
        setNotFound(true);
      } else {
        setHasMore(newEvents.length >= 6);
        setEvents((prevEvents) =>
          pageNum > page ? [...prevEvents, ...newEvents] : newEvents
        );
        setPage(pageNum);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(page);
  }, [eventTypeFilter]);

  const handleLoadMore = () => {
    if (hasMore) fetchEvents(page + 1);
    else setNotFound(true);
  };

  const handlePrevious = () => {
    if (page > 1) fetchEvents(page - 1);
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-5">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-6 lg:mb-0">
            Upcoming Events
          </h2>

          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 w-full lg:w-auto">
            {/* <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
            >
              <option value="">All Locations</option>
              {locationOptions.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select> */}

            <select
              value={eventTypeFilter}
              onChange={(e) => setEventTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
            >
              <option value="">Event Types</option>
              {eventTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <select
              value={anyCategory}
              onChange={(e) => setAnyCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
            >
              <option value="">Any Category</option>
              {anyCtegoryOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {events.length > 0 ? (
              events.map((event, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={
                        event.eventLogo.startsWith("http")
                          ? event.eventLogo
                          : `/images/${event.eventLogo}`
                      }
                      alt={event.eventName}
                      className="w-full h-48 object-cover transition-transform transform hover:scale-110"
                    />
                  </div>
                  <div className="p-4 flex">
                    <div className="bg-white text-center p-2 rounded-lg w-16 h-16 flex-shrink-0">
                      <p className="text-sm text-purple-600 uppercase">
                        {new Date(event.eventDateStart).toLocaleDateString(
                          "en-US",
                          { month: "short" }
                        )}
                      </p>
                      <p className="text-xl font-bold text-black">
                        {new Date(event.eventDateStart).getDate()}
                      </p>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-bold text-gray-800 mb-1">
                        {event.eventName}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                className="text-center text-gray-500 text-lg mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {notFound
                  ? "No events found. Try adjusting your filters."
                  : null}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-center items-center w-full mt-8 space-x-4">
          {page > 1 && (
            <button
              onClick={handlePrevious}
              className="px-6 py-2 text-lg font-bold text-center text-indigo-600 bg-white border-2 border-indigo-600 rounded-full shadow-lg hover:bg-indigo-600 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105"
              disabled={loading}
            >
              Previous
            </button>
          )}
          {hasMore ? (
            <button
              onClick={handleLoadMore}
              className="px-6 py-2 text-lg font-bold text-center text-indigo-600 bg-white border-2 border-indigo-600 rounded-full shadow-lg hover:bg-indigo-600 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105"
              disabled={loading}
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          ) : notFound && (
            <motion.div
              className="text-center text-gray-500 text-lg mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              No more events to load.
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
