package com.github.tuczv.event;

import com.github.tuczv.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping(value = "/api")
public class EventResource {

   /* @Autowired
    private EventsRepository eventsRepository;

    @Autowired
    private EventService eventService;

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "/events", method = RequestMethod.GET)
    public List<CalendarEvent> getEvents() {
        User user = userRepository.findByUsername(SecurityUtils.getCurrentLoginUser());
        return eventService.getEventsByUser(user);
    }

    @RequestMapping(value = "/events", method = RequestMethod.POST)
    public @ResponseBody void newEvent(@RequestBody CalendarEvent event) {
        eventsRepository.save(event);
    }

    @RequestMapping(value = "/events/{id}", method = RequestMethod.PUT)
    public CalendarEvent edit(@PathVariable("id") String id, @RequestBody CalendarEvent calendarEvent) {
        CalendarEvent event = eventsRepository.getEventById(id);
        event.setTitle(calendarEvent.getTitle());
        event.setStart(calendarEvent.getStart());
        event.setEnd(calendarEvent.getEnd());
        event.setLocation(calendarEvent.getLocation());
        return eventsRepository.save(event);
    }

    @RequestMapping(value = "/events/{id}", method = RequestMethod.DELETE)
    public void remove(@PathVariable("id") String id) {
        eventsRepository.delete(id);
    }*/
}