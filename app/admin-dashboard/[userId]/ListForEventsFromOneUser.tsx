'use client';

import Image from 'next/image';
import React, { useRef } from 'react';
import { ViewAllEventsFromOneUser } from '../../../database/events';

// import AdminEventsForm from './AdminEventsForm';

type Props = {
  allEventsFromOneUser: ViewAllEventsFromOneUser[];
};

export default function ListForAllEventsFromOneUser(props: Props) {
  const elementRef = useRef<HTMLDivElement>(null);

  const slideRight = (element: HTMLDivElement | null) => {
    if (element) {
      element.scrollLeft += 500;
    }
  };

  const slideLeft = (element: HTMLDivElement | null) => {
    if (element) {
      element.scrollLeft -= 500;
    }
  };

  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        onClick={() => slideLeft(elementRef.current)}
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-8 h-8 absolute rotate-180 top-[35%] bg-gray-300 cursor-pointer p-1 rounded-full text-white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>

      <div
        className="flex overflow-scroll overflow-x-auto gap-4 scrollbar-hide scroll-smooth"
        ref={elementRef}
      >
        {props.allEventsFromOneUser.map((event: ViewAllEventsFromOneUser) => (
          <div
            key={`event-${event.eventId}`}
            className="w-[195px] flex-shrink-0 p-2 rounded-lg shadow-md mb-1 bg-white hover:scale-110 transition-all mt-[20px] cursor-pointer"
          >
            <Image
              src={event.secureUrl}
              alt="no image yet"
              width={180}
              height={80}
              className="rounded-lg object-cover h-[90px]"
            />

            <h2 className="text-[13px] font-bold mt-1 line-clamp-1">
              {event.firstName.toUpperCase()}
            </h2>
            <h2 className="text-[13px] font-bold mt-1 line-clamp-1">
              {event.date}
            </h2>

            <h2 className="text-[10px] text-gray-400 line-clamp-2">
              Pollution: {event.pollutionKind}
            </h2>
            <h2 className="text-[10px] text-gray-400 line-clamp-2">
              Region: {event.regionState}
            </h2>
            <h2 className="text-[10px] text-gray-400 line-clamp-2">
              Report: {event.report}
            </h2>
            <h2 className="text-[10px] text-gray-400 line-clamp-2">
              Damage Estimation: {event.damageEstimation}
            </h2>

            {event.adminComment ? (
              <div className="flex gap-1 items-center">
                <h2 className="text-[10px] font-bold">
                  Comment: {event.adminComment}
                </h2>
              </div>
            ) : null}

            {event.offer ? (
              <div className="border-t-[1px] p-1 mt-1">
                <h2 className="text-[#0075ff] flex justify-between items-center">
                  <span className="border-[1px] p-1 rounded-full border-blue-500 hover:text-white hover:bg-blue-500">
                    Offered: {event.offer}
                  </span>
                </h2>
              </div>
            ) : null}
            {/*  <AdminEventsForm eventId={event.eventId} /> */}
          </div>
        ))}
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => slideRight(elementRef.current)}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-8 h-8 absolute right-0 top-[35%] bg-gray-300 cursor-pointer p-1 rounded-full text-white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>
    </div>
  );
}
