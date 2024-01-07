'use client'

const Progress = ({ progress }: { progress: number }) => {
  return (
    <div className="w-full rounded-full h-2.5 bg-gray-300">
      <div
        className='bg-blue-500 h-2.5 rounded-full'
        style={{width: `${progress}%`}}
      ></div>
    </div>
  );
}

export default Progress;