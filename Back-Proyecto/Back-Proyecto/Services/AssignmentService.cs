using Back_Proyecto.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Back_Proyecto.Services
{
    public class AssignmentService
    {
        private readonly MyDbContext _context;

        public AssignmentService(MyDbContext context)
        {
            _context = context;
        }

        public List<Assignment> GetAllAssignments()
        {
            return _context.Assignment.Include(a => a.User).ToList();
        }

        public Assignment GetAssignmentById(int id)
        {
            return _context.Assignment.FirstOrDefault(a => a.id == id);
        }

        public void CreateAssignment(Assignment assignment)
        {
            _context.Assignment.Add(assignment);
            _context.SaveChanges();
        }

        public void UpdateAssignment(Assignment assignment, int id)
        {
            try
            {
                if (assignment == null)
                {
                    throw new ArgumentNullException(nameof(assignment));
                }
                var assignmentToUpdate = _context.Assignment.Where(a => a.id == id).FirstOrDefault();
                if (assignmentToUpdate == null)
                {
                    throw new ArgumentNullException(nameof(assignmentToUpdate));
                }
                _context.Entry(assignmentToUpdate).CurrentValues.SetValues(assignment);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public List<Assignment> GetAssignmentsByUserId(int userId)
        {
            return _context.Assignment.Where(a => a.userid == userId).ToList();
        }

        public void DeleteAssignment(int id)
        {
            var assignment = _context.Assignment.Find(id);
            if (assignment != null)
            {
                _context.Assignment.Remove(assignment);
                _context.SaveChanges();
            }
        }
    }
}
