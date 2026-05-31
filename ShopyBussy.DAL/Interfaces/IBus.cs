using ShopyBussy.DAL.Entity;

namespace ShopyBussy.DAL.Interfaces
{
    public interface IBus
    {
        ICollection<AmenitiesType> Amenities { get; set; }
        Guid CompanyId { get; set; }
        string Description { get; set; }
        Guid Id { get; set; }
        string Model { get; set; }
        string PlateNumber { get; set; }
        Guid TemplateId { get; set; }
    }
}