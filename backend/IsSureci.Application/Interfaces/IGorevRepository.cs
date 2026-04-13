using IsSureci.Domain.Entities;

namespace IsSureci.Application.Interfaces;

public interface IGorevRepository
{
    Task<List<Gorev>> GetAllAsync();
    Task<Gorev?> GetByIdAsync(int id);
    Task<Gorev> CreateAsync(Gorev gorev);
    Task<Gorev?> UpdateAsync(Gorev gorev);
    Task<bool> DeleteAsync(int id);
}