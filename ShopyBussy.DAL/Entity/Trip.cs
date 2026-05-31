using ShopyBussy.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShopyBussy.DAL.Entity
{
    public enum TripType
    {
        Pending = 0,
        Completed = 1,
        Cancelled = 2,
    }
    public class Trip : ITrip
    {
        public Guid Id { get; set; }
        public Guid CompanyId { get; set; }
        public Guid BusId { get; set; }
        public string RouteNumber { get; set; } = string.Empty;
        public TripType Status { get; set; }
        public ICollection<TripStop> Stops { get; set; } = new List<TripStop>();

    }
}
