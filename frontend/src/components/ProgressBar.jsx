import { Progress } from 'flowbite-react';
import { useEffect, useState } from 'react';

export default function ProgressBar({ goals, type }) {
  const [completion, setCompletion] = useState(0);
  const [goal, setGoal] = useState({});

  useEffect(() => {
    const foundGoal = goals.find(({ goal_name }) => goal_name === type);
    if (foundGoal) {
      setGoal(foundGoal);
      setCompletion(
        Math.round((foundGoal.current_value / foundGoal.target_value) * 100),
      );
    }
  }, [goals, type]);

  return (
    <>
      {goal.goal_name === 'tetto di spesa' ? (
        <>
          <div className='text-lg font-medium dark:text-white'>
            {goal.goal_name}
          </div>
          <Progress
            progress={completion}
            textLabel={`€${goal.target_value}`}
            size='xl'
            labelProgress
            labelText
            color='red'
          />
        </>
      ) : (
        <></>
      )}
      {goal.goal_name === 'risparmi generali' ? (
        <>
          <div className='text-lg font-medium dark:text-white'>
            {goal.goal_name}
          </div>
          <Progress
            progress={completion}
            textLabel={`€${goal.target_value}`}
            size='xl'
            labelProgress
            labelText
            color='green'
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
}
