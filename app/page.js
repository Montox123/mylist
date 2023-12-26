"use client"
import React, { useState, useEffect } from 'react';

const Page = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    // Toggle blink every second
    const interval = setInterval(() => {
      setBlink((prevBlink) => !prevBlink);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const currentTime = new Date().toLocaleString();
    setMainTask([...mainTask, { title, desc, completed: false, time: currentTime }]);
    setTitle("");
    setDesc("");
  };

  const deleteHandler = (i) => {
    let copyTask = [...mainTask];
    copyTask.splice(i, 1);
    setMainTask(copyTask);
  };

  const completeHandler = (i) => {
    let copyTask = [...mainTask];
    copyTask[i].completed = true;
    setMainTask(copyTask);
  };

  let renderTask = (
    <h2 className={`text-center ${blink ? 'blink' : ''}`}>No Task Available</h2>
  );

  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => (
      <li className={`flex items-center justify-between mb-5 ${t.completed ? 'bg-green-200' : ''}`} key={i}>
        <div className='flex justify-between mb-6 w-2/3'>
          <h5 className='text-2xl font-semibold'>{t.title}</h5>
          <h6 className='text-xl font-semibold'>{t.desc}</h6>
          <p className='text-sm'>{t.time}</p>
        </div>
        <button
          onClick={() => deleteHandler(i)}
          className='bg-purple-500 text-black px-4 py-2 font-bold mr-3'>
          Delete
        </button>
        {!t.completed && (
          <button
            onClick={() => completeHandler(i)}
            className='bg-green-500 text-black px-4 py-2 font-bold'>
            Complete Task
          </button>
        )}
      </li>
    ));
  }

  return (
    <>
      <h1 className='bg-purple-500 text-black p-5 text-5xl font-bold text-center'>MY TODOLIST</h1>

      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="text-2xl border-zinc-800 border-4 m-4 px-4 py-2"
          placeholder='Enter Title Here'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="text-2xl border-zinc-800 border-4 m-4 px-4 py-2"
          placeholder='Enter Description Here'
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button className='bg-purple-500 text-black px-4 py-3 text-2xl font-bold rounded m-5'>Add Task</button>
      </form>

      <hr />
      <div className='p-8 bg-slate-200'>
        <ul>{renderTask}</ul>
      </div>
    </>
  );
};

export default Page;
