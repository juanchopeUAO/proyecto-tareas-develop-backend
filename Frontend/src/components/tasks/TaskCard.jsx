import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PRIORITIES, STATUS } from '../../common/contants';
import { Modal } from '../shared/Modal';
import { DeleteModal } from './DeleteModal';
import { assignmentsService } from '../../services/assigementService';
import pencil from '../../assets/pencil.svg';

export function TaskCard({ task, toogleEdit, getOldTask }) {
  const [isActive, setIsActive] = useState(false);

  const priorityStyles = () => {
    if (task.priority === PRIORITIES.ALTA) {
      return 'bg-warn text-white';
    } if (task.priority === PRIORITIES.MEDIA) {
      return 'bg-[#8FBC8B] textbalck';
    } if (task.priority === PRIORITIES.BAJA) {
      return 'bg-[#D3D3D3] text-balck';
    }
    return '';
  };

  const stateStyles = () => {
    if (task.state === STATUS.EN_PROGRESO) {
      return 'bg-gray-400';
    } if (task.state === STATUS.TERMINADO) {
      return 'bg-green-400';
    }
    return '';
  };

  const handleEdit = () => {
    toogleEdit();
    getOldTask(task);
  };

  const toogle = () => {
    setIsActive(!isActive);
  };

  const completeTask = async () => {
    const newState = task.state === STATUS.EN_PROGRESO ? STATUS.TERMINADO : STATUS.EN_PROGRESO;
    const newTask = { ...task, state: newState };
    await assignmentsService.update(newTask.id, newTask);
    window.location.reload();
  };

  return (
    <div className="flex flex-col bg-white border border-gray-100 rounded-lg shadow-lg overflow-hidden w-96">
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1 mb-3">
          <div className="flex justify-between items-center text-center mb-4">
            <p className="text-sm">
              Estado:
              {' '}
              <span className={`p-1.5 rounded-md ${stateStyles()}`}>{task.state}</span>
            </p>
            <p className="text-black text-sm">
              Prioridad:
              {' '}
              <span className={`p-1.5 rounded-md ${priorityStyles()}`}>{task.priority}</span>
            </p>
            <button onClick={handleEdit} type="button">
              <img src={pencil} alt="" className="w-7 text-center" />
            </button>
          </div>
          <p className="text-xl font-medium text-black">
            {task.title}
          </p>
          <p className="text-md text-gray-900">
            {task.description}
          </p>
        </div>
        <div className="flex justify-center gap-6">
          <button onClick={completeTask} type="button" className="bg-base text-white p-2 rounded-md w-32">
            Completar
          </button>
          <button onClick={toogle} type="button" className="bg-warn text-white p-2 rounded-md w-32">
            Eliminar
          </button>
        </div>
      </div>
      <Modal toogle={toogle} active={isActive}>
        <DeleteModal titleTask={task.title} taskId={task.id} />
      </Modal>
    </div>
  );
}

TaskCard.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    priority: PropTypes.string,
    state: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  toogleEdit: PropTypes.func.isRequired,
  getOldTask: PropTypes.func.isRequired,
};
