import { SignOut } from "icons";

export function NavUserSkeleton() {
  return (
    <div className="ui-flex ui-items-center ui-gap-2">
      <div className="ui-w-8 ui-h-8  ui-flex-none ui-rounded-full ui-overflow-hidden ui-border-outline-primary ui-bg-gray-900">
        <span className="ui-w-full ui-h-full ui-object-cover ui-bg-gray-300 ui-animate-pulse" />
      </div>
      <div className="ui-flex ui-flex-1 ui-min-w-0 ui-flex-col ui-gap-1">
        <span className="ui-text-base ui-rounded ui-leading-[1.25] ui-inline-block ui-w-32 ui-h-5 ui-bg-gray-700 ui-animate-pulse" />
        <span className="ui-text-xs ui-rounded ui-leading-[1.25] ui-inline-block ui-w-40 ui-h-[15px] ui-bg-gray-900 ui-animate-pulse" />
      </div>
      <button className="ui-p-2 hover:ui-bg-gray-900 ui-rounded ui-flex-none ui-text-type-me hover:ui-text-type-he ui-transition ui-border-outline-primary">
        <SignOut size={16} />
      </button>
    </div>
  );
}
