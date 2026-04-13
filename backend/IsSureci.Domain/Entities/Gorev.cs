using IsSureci.Domain.Enums;

namespace IsSureci.Domain.Entities;

public class Gorev
{
    public int Id { get; set; }
    public string Baslik { get; set; } = string.Empty;
    public string Aciklama { get; set; } = string.Empty;
    public GorevDurumu Durum { get; set; } = GorevDurumu.Bekliyor;
    public DateTime OlusturmaTarihi { get; set; } = DateTime.UtcNow;
    public int? AtananKullaniciId { get; set; }
    public Kullanici? AtananKullanici { get; set; }
}