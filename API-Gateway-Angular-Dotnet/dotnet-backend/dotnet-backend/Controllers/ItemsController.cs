using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace dotnet_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemsController : ControllerBase
    {
        private static List<Item> items = new List<Item>
        {
            new Item { Id = 1, Name = "Item 1" },
            new Item { Id = 2, Name = "Item 2" }
        };

        [HttpGet]
        public ActionResult<IEnumerable<Item>> Get() => items;

        [HttpGet("{id}")]
        public ActionResult<Item> Get(int id)
        {
            var item = items.FirstOrDefault(i => i.Id == id);
            if (item == null) return NotFound();
            return item;
        }

        [HttpPost]
        public ActionResult<Item> Post(Item item)
        {
            item.Id = items.Count > 0 ? items.Max(i => i.Id) + 1 : 1;
            items.Add(item);
            return CreatedAtAction(nameof(Get), new { id = item.Id }, item);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Item updated)
        {
            var item = items.FirstOrDefault(i => i.Id == id);
            if (item == null) return NotFound();
            item.Name = updated.Name;
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var item = items.FirstOrDefault(i => i.Id == id);
            if (item == null) return NotFound();
            items.Remove(item);
            return NoContent();
        }
    }

    public class Item
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
