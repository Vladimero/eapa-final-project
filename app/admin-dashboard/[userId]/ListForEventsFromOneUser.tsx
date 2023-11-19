'use client';

import { LatLngExpression } from 'leaflet';
import Link from 'next/link';
import React, { useRef } from 'react';
import { ViewAllEventsFromOneUser } from '../../../database/events';
import AdminEventsForm from './AdminEventsForm';

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

      {props.allEventsFromOneUser.length > 0 ? (
        <div
          className="flex overflow-scroll overflow-x-auto gap-4 scrollbar-hide scroll-smooth"
          ref={elementRef}
        >
          {props.allEventsFromOneUser.map((event: ViewAllEventsFromOneUser) => (
            <div
              key={`event-${event.eventId}`}
              className="w-[195px] flex-shrink-0 p-2 rounded-lg shadow-md mb-1 bg-white hover:scale-110 transition-all mt-[20px] cursor-pointer"
            >
              <Link href={`/admin-dashboard/${event.eventId}`}>
                <img
                  src={event.secureUrl}
                  alt="no image yet"
                  width={180}
                  height={80}
                  className="rounded-lg object-cover h-[90px]"
                />
              </Link>

              <h2 className="text-[13px] font-bold mt-1 line-clamp-1">
                {event.firstName}`s event from: {event.date}
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-3 h-3 text-yellow-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
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
              <AdminEventsForm eventId={event.eventId} />
            </div>
          ))}
        </div>
      ) : (
        <h2> The user has no events created yet</h2>
      )}
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
