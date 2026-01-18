import Spinner from "@modules/common/icons/spinner";

export default function Loading() {
  return (
    <div className="flex h-full min-h-[48vh] w-full items-center justify-center text-ui-fg-base">
      <Spinner size={36} />
    </div>
  );
}
