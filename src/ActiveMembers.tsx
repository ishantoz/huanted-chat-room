import DisplayTime from './components/DisplayTime';
import { formatNumber } from './lib/utils';

export type TMemember = {
  username: string;
  joined_at: string;
  uuid: string;
  clientID: string;
};

export default function ActiveMembers({
  handleShowActiveMembers,
  show,
  uuid,
  members,
}: {
  handleShowActiveMembers: () => void;
  members: TMemember[];
  show: boolean;
  uuid: string;
}) {
  return (
    <div
      style={{
        display: show ? 'flex' : 'none',
      }}
      className="left-0 right-0 w-full h-full bg-slate-900 absolute z-30 flex flex-col"
    >
      <div className="sm:py-3.5 py-2.5 flex items-center relative justify-center">
        <h1 className="sm:text-lg text-orange-500 flex items-center gap-1 font-semibold">
          <span> Active users:</span>{' '}
          <span className="mt-[2.4px]">{formatNumber(members.length)}</span>
        </h1>
        <button
          onClick={handleShowActiveMembers}
          className="absolute left-3 sm:text-xl text-orange-500 active:scale-95"
        >
          {'🡨'}
        </button>
      </div>
      <div className="flex-1 bg-slate-950 rounded-xl overflow-x-hidden p-4 flex flex-col gap-3 border border-slate-600/20">
        {members.map((member, i) => (
          <div
            key={member.uuid + ' ' + i}
            className="px-5 rounded-xl py-3 border border-slate-600/20 bg-slate-900/60 flex flex-wrap  justify-between gap-3 items-end"
          >
            <div>
              {uuid === member.uuid ? (
                <h3 className="text-blue-500 font-semibold cursor-pointer hover:underline">
                  You ({member.username})
                </h3>
              ) : (
                <h3 className="text-neutral-200 font-semibold cursor-pointer hover:underline">
                  {member.username}
                </h3>
              )}
              <span className="text-sm text-green-400">Active</span>
            </div>
            <div className="flex">
              <DisplayTime prefix="Joined at" time={member.joined_at} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
