/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { assignmentsService } from '../../services/assigementService';

export function TaskForm({ isEdited, oldTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Media');

  const handleSubmit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const task = {
      title,
      description,
      priority,
    };

    assignmentsService.create(task);
    setTitle('');
    setDescription('');
    setPriority('Media');
    window.location.reload();
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const task = {
      ...oldTask,
      title,
      description,
      priority,
    };

    assignmentsService.update(task.id, task);
    setTitle('');
    setDescription('');
    setPriority('Media');
    window.location.reload();
  };

  useEffect(
    () => {
      setTitle(oldTask?.title);
      setDescription(oldTask?.description);
      setPriority(oldTask?.priority);
    },
    [oldTask],
  );

  return (
    <form
      onClick={(e) => e.stopPropagation()}
      name="taskForm"
      className="border border-gray-400 rounded-md border-transparent px-4 h-[28rem] w-96 flex flex-col bg-white justify-center items-center"
    >
      <h2 className="text-2xl font-medium mt-1 mb-4">
        Nueva Tarea
      </h2>
      <div className="relative z-0 w-64 mb-4">
        <input
          className="peer block border-b appearance-none pt-2.5 px-0 w-full focus:outline-none focus:ring-0 text-sm pb-1 border-gray-500 bg-transparent text-black focus:border-base"
          type="text"
          name="title"
          placeholder=""
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />
        <label
          htmlFor="title"
          className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-gray-500 duration-300 text-sm
          peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-base "
        >
          Titulo
        </label>
      </div>
      <div className="relative z-0 w-64 mb-4">
        <textarea
          className="h-48 peer block border-b appearance-none pt-2.5 px-0 w-full focus:outline-none focus:ring-0 text-sm border-gray-500 bg-transparent text-black focus:border-base resize-none "
          name="description"
          placeholder=" "
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          required
        />
        <label
          htmlFor="description"
          className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-gray-500 duration-300 text-sm
          peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-base"
        >
          Descripcion

        </label>
      </div>

      <div className="relative z-0 w-64 mb-4">
        <p className="text-sm">Prioridad</p>
        <div className="flex justify-center gap-4 text-sm">

          <label htmlFor="priorityLow" className="flex gap-1">
            <span>Baja</span>
            <input onChange={(e) => setPriority(e.target.value)} type="radio" id="priorityLow" name="priority" value="Baja" checked={priority === 'Baja'} />
          </label>
          <label htmlFor="priorityMedium" className="flex gap-1">
            <span>Media</span>
            <input onChange={(e) => setPriority(e.target.value)} type="radio" id="priorityMedium" name="priority" value="Media" checked={priority === 'Media'} />
          </label>

          <label htmlFor="priorityHigh" className="flex gap-1">
            <span>Alta</span>
            <input onChange={(e) => setPriority(e.target.value)} type="radio" id="priorityHigh" name="priority" value="Alta" checked={priority === 'Alta'} />
          </label>
        </div>
      </div>

      <div className="w-64">
        <button
          type="submit"
          onClick={isEdited ? handleEdit : handleSubmit}
          className="bg-base w-full hover:bg-base text-white py-2 px-4 rounded"
        >
          Guardar
        </button>
      </div>
    </form>
  );
}

TaskForm.propTypes = {
  oldTask: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    priority: PropTypes.string,
  }).isRequired,
};
