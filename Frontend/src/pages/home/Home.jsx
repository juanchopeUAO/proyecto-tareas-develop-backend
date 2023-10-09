import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components';
import { Modal } from '../../components/shared/Modal';
import { TaskForm } from '../../components/tasks/TaskForm';
import { TaskCard } from '../../components/tasks/TaskCard';
import { assignmentsService } from '../../services/assigementService';

export function Home() {
  const [isActive, setIsActive] = useState(false);
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
      <div className="h-auto w-full gap-4 p-3 grid grid-flow-col auto-cols-max">
        {task.length > 0 && task?.map((item) => (
          <TaskCard key={item.id} task={item} />
        ))}
      </div>

      <Modal active={isActive} toogle={toogle}>
        <TaskForm />
      </Modal>
    </>
  );
}
