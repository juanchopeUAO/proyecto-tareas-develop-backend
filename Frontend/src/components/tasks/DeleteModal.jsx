import React from 'react';
import PropTypes from 'prop-types';
import { assignmentsService } from '../../services/assigementService';

export function DeleteModal({ titleTask, taskId }) {
  const deleteTask = async () => {
    await assignmentsService.delete(taskId);
    window.location.reload();
  };

  return (
    <div className="p-6 bg-white rounded-lg space-y-4">
      <p>¿Seguro que quieres eliminar esta tarea?</p>
      <p className="text-lg text-black font-medium ">
        *
        {' '}
        {titleTask}
      </p>
      <button onClick={deleteTask} type="button" className="w-full bg-warn p-3 rounded-lg text-white">Si, eliminar</button>
    </div>
  );
}

DeleteModal.propTypes = {
  titleTask: PropTypes.string.isRequired,
  taskId: PropTypes.number.isRequired,
};
