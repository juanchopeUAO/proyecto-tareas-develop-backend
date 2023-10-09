using Back_Proyecto.Models;
using Back_Proyecto.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace Back_Proyecto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // Asegura que solo los usuarios autenticados puedan acceder a este controlador
    public class AssignmentController : ControllerBase
    {
        private readonly AssignmentService _assignmentService;

        public AssignmentController(AssignmentService assignmentService)
        {
            _assignmentService = assignmentService;
        }

        [HttpGet]
        public ActionResult<List<Assignment>> GetAllAssignments()
        {
            var assignments = _assignmentService.GetAllAssignments();
            return Ok(assignments);
        }


        [HttpGet("{id}")]
        public ActionResult<Assignment> GetAssignmentById(int id)
        {
            var assignment = _assignmentService.GetAssignmentById(id);
            if (assignment == null)
            {
                return NotFound();
            }
            return Ok(assignment);
        }

        [HttpPost]
        public IActionResult CreateAssignment(Assignment assignment)
        {
            Console.WriteLine(assignment);
            try
            {

                _assignmentService.CreateAssignment(assignment);

                return CreatedAtAction(nameof(GetAssignmentById), new { assignment.id }, assignment);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateAssignment(int id, Assignment assignment)
        {
            if (id != assignment.id)
            {
                return BadRequest("ID del modelo y ID de ruta no coinciden.");
            }

            try
            {
                _assignmentService.UpdateAssignment(assignment);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("user/{userId}")]
        public ActionResult<List<Assignment>> GetAssignmentsByUserId(int userId)
        {
            try
            {
                var assignments = _assignmentService.GetAssignmentsByUserId(userId);

                if (assignments == null || assignments.Count == 0)
                {
                    return NotFound("No se encontraron tareas para este usuario.");
                }

                return Ok(assignments);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteAssignment(int id)
        {
            try
            {
                _assignmentService.DeleteAssignment(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
