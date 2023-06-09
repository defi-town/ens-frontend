import React from 'react';
import cn from 'classnames';
import Countdown, { zeroPad } from 'react-countdown';

function CountdownDisplayWrapper({ days, hours, minutes, seconds }: any) {
  return (
    <div
      className={cn(
        'flex items-center text-base font-medium -tracking-wider text-gray-900 dark:text-gray-100 xs:text-lg md:text-xl xl:text-xl 2xl:text-2xl',
        {
          'gap-3 md:gap-2.5 lg:gap-6 xl:gap-5 ': true,
          'gap-4 lg:gap-2.5 rtl:lg:gap-1.5 3xl:gap-5': true,
        }
      )}
    >
      {!!days && (
        <div className="shrink-0 3xl:w-20">
          <span className="">{zeroPad(days)}</span>
          <span
            className={cn({
              'md:hidden': true,
            })}
          >
            d
          </span>
          <span
            className={cn(
              'hidden truncate pt-2.5 text-sm -tracking-wide text-gray-600 dark:text-gray-400 ',
              {
                'md:block': true,
              }
            )}
          >
            Days
          </span>
        </div>
      )}
      <div className="shrink-0 3xl:w-20">
        <span className="">{zeroPad(hours)}</span>
        <span
          className={cn({
            'md:hidden': true,
          })}
        >
          h
        </span>
        <span
          className={cn(
            'hidden truncate pt-2.5 text-sm -tracking-wide text-gray-600 dark:text-gray-400',
            {
              'md:block': true,
            }
          )}
        >
          Hours
        </span>
      </div>
      <div className="shrink-0 3xl:w-20">
        <span className="">{zeroPad(minutes)}</span>
        <span
          className={cn({
            'md:hidden': true,
          })}
        >
          m
        </span>
        <span
          className={cn(
            'hidden truncate pt-2.5 text-sm -tracking-wide text-gray-600 dark:text-gray-400 ',
            {
              'md:block': true,
            }
          )}
        >
          Minutes
        </span>
      </div>
      <div className="shrink-0 3xl:w-20">
        <span className="">{zeroPad(seconds)}</span>
        <span
          className={cn({
            'md:hidden': true,
          })}
        >
          s
        </span>
        <span
          className={cn(
            'hidden truncate pt-2.5 text-sm -tracking-wide text-gray-600 dark:text-gray-400 ',
            {
              'md:block': true,
            }
          )}
        >
          Seconds
        </span>
      </div>
    </div>
  );
}

const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
  if (completed) {
    return null;
  } else {
    return (
      <CountdownDisplayWrapper
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default function AuctionCountdown({
  date,
}: {
  date: string | number | Date | undefined;
}) {
  return <Countdown date={date} renderer={renderer} />;
}
