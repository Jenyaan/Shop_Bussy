using Microsoft.EntityFrameworkCore;
using Shopy_Bussy.DAL.EF;
using ShopyBussy.DAL.Entity;
using ShopyBussy.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShopyBussy.DAL.Repositories
{
    public class BusRepository
    {
        private readonly ShopyBussyDbContext _context;

        public BusRepository(ShopyBussyDbContext context)
        {
            _context = context;
        }

        public async Task<Bus> GetByIdAsync(Guid id) =>
           await _context.Buses.SingleOrDefaultAsync(C => C.Id == id);


        public async Task<List<Bus>> GetByCompanyIdAsync(Guid companyId)
        {
            return await _context.Buses
                .Where(t => t.CompanyId == companyId)
                .ToListAsync();
        }

        public async Task<bool> CreateAsync(Bus bus)
        {
            try
            {
                await _context.Buses.AddAsync(bus);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed create Bus: {ex.Message}"); ;
                return false;
            }
        }

        //public async Task<bool> UpdateAsync(User updatedUser)
        //{
        //    try
        //    {
        //        var existing = await _context.Users.FindAsync(updatedUser.Id);
        //        if (existing == null)
        //            return false;

        //        existing.FirstName = updatedUser.FirstName;
        //        existing.LastName = updatedUser.LastName;
        //        existing.Email = updatedUser.Email;
        //        existing.Phone = updatedUser.Phone;

        //        _context.Users.Update(existing);
        //        await _context.SaveChangesAsync();
        //        return true;
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine($"Failed update User: {ex.Message}");
        //        return false;
        //    }
        //}
    }
}
