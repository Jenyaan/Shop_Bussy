using Microsoft.EntityFrameworkCore;
using Shopy_Bussy.DAL.EF;
using ShopyBussy.DAL.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShopyBussy.DAL.Repositories
{
    public class TripStopRepository
    {
        private readonly ShopyBussyDbContext _context;

        public TripStopRepository(ShopyBussyDbContext context)
        {
            _context = context;
        }

        public async Task<TripStop> GetByIdAsync(Guid id) =>
           await _context.TripStops.SingleOrDefaultAsync(C => C.Id == id);


        public async Task<List<TripStop>> GetStopsInRangeAsync(Guid tripId, int startNumberId, int endNumberId)
        {

            return await _context.TripStops
                .Where(s => s.TripId == tripId && s.NumberId >=
                Math.Min(startNumberId, endNumberId) && s.NumberId <=
                Math.Max(startNumberId, endNumberId))
                .OrderBy(s => s.NumberId)
                .ToListAsync();
        }

        public async Task<bool> CreateAsync(TripStop tripStop)
        {
            try
            {
                await _context.TripStops.AddAsync(tripStop);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed create TripStop: {ex.Message}"); ;
                return false;
            }
        }

        public async Task<bool> SyncTripStopsAsync(Guid tripId, List<TripStop> incomingStops)
        {
            try
            {
                var existingStops = await _context.TripStops
                    .Where(s => s.TripId == tripId)
                    .ToListAsync();

                var incomingIds = incomingStops
                    .Where(s => s.Id != Guid.Empty)
                    .Select(s => s.Id)
                    .ToList();

                var stopsToRemove = existingStops.Where(s => !incomingIds.Contains(s.Id)).ToList();
                _context.TripStops.RemoveRange(stopsToRemove);

                for (int i = 0; i < incomingStops.Count; i++)
                {
                    var incomingStop = incomingStops[i];

                    if (incomingStop.Id != Guid.Empty)
                    {
                        var existing = existingStops.FirstOrDefault(s => s.Id == incomingStop.Id);
                        if (existing != null)
                        {
                            existing.NumberId = i;
                            existing.StationName = incomingStop.StationName;
                            existing.Price = incomingStop.Price;
                            existing.Time = incomingStop.Time;
                            existing.City = incomingStop.City;
                        }
                    }
                    else
                    {
                        incomingStop.Id = Guid.NewGuid();
                        incomingStop.TripId = tripId;
                        incomingStop.NumberId = i;

                        _context.TripStops.Add(incomingStop);
                    }
                }

                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to sync TripStops: {ex.Message}");
                return false;
            }
        }
    }
}