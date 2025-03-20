import DisplayTime from './/DisplayTime';
import { formatNumber } from '../lib/utils';
import { useChat } from './ChatProvider';

export default function ActiveMembers() {
  const { members, countMember } = useChat();
  const { handleShowActiveMembers, showActiveMembers, user } = useChat();

  return (
    <div
      style={{
        right: showActiveMembers ? '0' : '-100%',
        opacity: showActiveMembers ? '1' : '0',
      }}
      className="right-[-100%] opacity-0 transition-all duration-300 top-[0] w-full h-full bg-slate-900 absolute z-30 flex flex-col"
    >
      <div className="sm:py-3.5 py-2.5 flex items-center relative justify-center">
        <h1 className="sm:text-md flex items-center gap-1 font-semibold tracking-widest font-faculty text-blue-400 ">
          <span> Active users:</span>{' '}
          <span className="mt-[2.4px]">{formatNumber(countMember)}</span>
        </h1>
        <button
          onClick={handleShowActiveMembers}
          className="absolute text-neutral-300 left-3 sm:text-xl  active:scale-95"
        >
          {`< Back`}
        </button>
      </div>
      <div className="flex-1 bg-slate-950 rounded-xl overflow-x-hidden p-4 flex flex-col gap-3 border border-slate-600/20">
        {members.map((member, i) => (
          <div
            key={member.uuid + ' ' + i}
            className="px-5 rounded-xl py-3 border border-slate-600/20 bg-slate-900/60 flex flex-wrap  justify-between gap-3 items-end"
          >
            <div>
              {user.uuid === member.uuid ? (
                <h3 className="text-blue-400 font-metal tracking-widest font-semibold cursor-pointer hover:underline">
                  You ({member.username})
                </h3>
              ) : (
                <h3 className="text-neutral-200 font-metal tracking-widest font-semibold cursor-pointer hover:underline">
                  {member.username}
                </h3>
              )}
              <span className="text-sm text-green-300">Active</span>
            </div>
            <div className="flex">
              <DisplayTime prefix="Joined" time={member.joined_at} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
