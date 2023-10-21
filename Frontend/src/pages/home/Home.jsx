import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components';
import { Modal } from '../../components/shared/Modal';
import { TaskForm } from '../../components/tasks/TaskForm';
import { TaskCard } from '../../components/tasks/TaskCard';
import { assignmentsService } from '../../services/assigementService';

export function Home() {
  const [isActive, setIsActive] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [oldTask, setOldTask] = useState();

  const [task, setTask] = useState({
    id: '1',
    title: 'Comprar leche',
    description: 'tengo que ir al supermercado para comprar leche, huevos, pan, frutas para le jugo, mantequellia, arroz, pasta, carne, pollo, pescado, y verduras',
    priority: 'Alta',
    state: 'Completada',
  });

  const toogle = () => {
    setIsActive(!isActive);
  };

  const toogleEdit = () => {
    setIsEdited(!isEdited);
    setIsActive(!isActive);
  };

  const getOldTask = (taskEdit) => {
    setOldTask(taskEdit);
  };

  useEffect(() => {
    const getTask = async () => {
      const data = await assignmentsService.getAll();
      setTask(data);
    };
    getTask();
  }, []);

  return (
    <>
      <Navbar toogle={toogle} />
      <div className="h-full w-full gap-4 p-3 grid grid-cols-1 justify-items-center lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {task.length > 0 && task?.map((item) => (
          <TaskCard key={item.id} task={item} isEdited toogleEdit={toogleEdit} getOldTask={getOldTask} />
        ))}
      </div>

      <Modal active={isActive} toogle={toogle}>
        <TaskForm isEdited toogleEdit={toogleEdit} oldTask={oldTask} />
      </Modal>
    </>
  );
}
