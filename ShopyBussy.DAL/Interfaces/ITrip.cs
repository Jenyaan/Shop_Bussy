using ShopyBussy.DAL.Entity;

namespace ShopyBussy.DAL.Interfaces
{
    public interface ITrip
    {
        Guid BusId { get; set; }
        Guid CompanyId { get; set; }
        Guid Id { get; set; }
        string RouteNumber { get; set; }
        TripType Status { get; set; }
        ICollection<TripStop> Stops { get; set; }
    }
}