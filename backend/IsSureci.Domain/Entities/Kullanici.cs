namespace IsSureci.Domain.Entities;

public class Kullanici
{
    public int Id { get; set; }
    public string Ad { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public ICollection<Gorev> Gorevler { get; set; } = new List<Gorev>();
}