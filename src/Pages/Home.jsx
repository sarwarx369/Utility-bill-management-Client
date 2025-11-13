import Slider from "../components/Slider";

export default function Home() {
  return (
    <div className="p-6 text-center">
      <Slider></Slider>
      <h2 className="text-2xl font-bold mt-6">
        Welcome to Utility Bill Management
      </h2>
      <p className="text-gray-600 mt-2">
        Manage and pay your monthly Electricity, Gas, Water, and Internet bills
        easily.
      </p>
    </div>
  );
}
