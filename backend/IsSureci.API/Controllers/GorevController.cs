using IsSureci.Application.DTOs;
using IsSureci.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace IsSureci.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GorevController : ControllerBase
{
    private readonly GorevService _service;

    public GorevController(GorevService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll() =>
        Ok(await _service.GetAllAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var gorev = await _service.GetByIdAsync(id);
        return gorev == null ? NotFound() : Ok(gorev);
    }

    [HttpPost]
    public async Task<IActionResult> Create(GorevOlusturDto dto)
    {
        var created = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _service.DeleteAsync(id);
        return result ? NoContent() : NotFound();
    }
}