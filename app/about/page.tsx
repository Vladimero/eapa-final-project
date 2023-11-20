import Image from 'next/image';
import AboutImage from '../../public/images/AboutImage.png';

export default function AboutPage() {
  return (
    <>
      <div className="sm:flex items-center max-w-screen-xl mt-36 border-b py-8">
        <div className="sm:w-1/2 p-10">
          <div className="image object-center text-center">
            <Image src={AboutImage} alt="About Image" />
          </div>
        </div>
        <div className="sm:w-1/2 p-5">
          <div className="text">
            <span className="text-gray-500 border-b-2 border-customOrange uppercase">
              About us
            </span>
            <h2 className="my-4 font-bold text-3xl  sm:text-4xl ">
              <span className="text-customOrange">EAPA</span>
            </h2>
            <p className="text-gray-700">
              Embracing a vision of sustainability, the Environmental Assessment
              Platform of Austria is dedicated to advancing ecological
              stewardship. Our platform spearheads comprehensive environmental
              evaluations, facilitating informed decision-making for a greener
              future. By leveraging cutting-edge technology and data analytics,
              we empower stakeholders to mitigate environmental impact
              effectively. From industrial sectors to civic planning, our
              platform fosters collaboration, offering robust insights and
              solutions for sustainable development. Our commitment extends
              beyond assessments; we're catalysts for change, promoting
              innovation and strategies that harmonize human progress with
              ecological preservation. Join us in our pursuit of a resilient
              world, where sustainability is not just a goal but a collective
              responsibility.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
