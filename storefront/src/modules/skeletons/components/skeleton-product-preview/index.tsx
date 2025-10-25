import { Container } from "@medusajs/ui";

const SkeletonProductPreview = () => {
  return (
    <div className="animate-pulse">
      <Container className="h-40 w-full bg-gray-100 bg-ui-bg-subtle sm:h-60" />
      <div className="text-base-regular mt-4 flex flex-col gap-2">
        <div className="h-6 w-full bg-gray-100"></div>
        <div className="h-6 w-full bg-gray-100"></div>
        <div className="h-6 w-1/2 bg-gray-100"></div>
      </div>
    </div>
  );
};

export default SkeletonProductPreview;
