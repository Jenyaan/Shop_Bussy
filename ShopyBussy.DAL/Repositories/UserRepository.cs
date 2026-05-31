using Microsoft.EntityFrameworkCore;
using Shopy_Bussy.DAL.EF;
using ShopyBussy.DAL.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShopyBussy.DAL.Repositories
{
    public class UserRepository
    {
        private readonly ShopyBussyDbContext _context;

        public UserRepository(ShopyBussyDbContext context)
        {
            _context = context;
        }

        public async Task<User> GetByIdAsync(Guid id) =>
           await _context.Users.SingleOrDefaultAsync(C => C.Id == id);


        public async Task<List<User>> GetByIdsAsync(IEnumerable<Guid> ids)
        {
            return await _context.Users
                .Where(u => ids.Contains(u.Id))
                .ToListAsync();
        }

        public async Task<bool> CreateAsync(User user)
        {
            try
            {
                await _context.Users.AddAsync(user);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed create User: {ex.Message}"); ;
                return false;
            }
        }

        public async Task<bool> UpdateAsync(User updatedUser)
        {
            try
            {
                var existing = await _context.Users.FindAsync(updatedUser.Id);
                if (existing == null)
                    return false;

                existing.FirstName = updatedUser.FirstName;
                existing.LastName = updatedUser.LastName;
                existing.Email = updatedUser.Email;
                existing.Phone = updatedUser.Phone;

                _context.Users.Update(existing);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed update User: {ex.Message}");
                return false;
            }
        }

    }
}
