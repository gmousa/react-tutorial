export function parseTime(time) {
    const [hour, minute] = time.split(':').map(Number);
    return hour * 60 + minute; // Convert to minutes since midnight
  }
  
  export function parseMeeting(meeting) {
    const [days, timeRange] = meeting.split(' ');
    const [start, end] = timeRange.split('-').map(parseTime);
    return { days, start, end };
  }
  
  export function timesOverlap(time1, time2) {
    return time1.start < time2.end && time1.end > time2.start;
  }
  
  export function meetingsOverlap(meeting1, meeting2) {
    if (meeting1.days !== meeting2.days) return false; // Different days, no overlap
    return timesOverlap(meeting1, meeting2);
  }
  
  export function canAddCourse(newCourse, selectedCourses) {
    const newMeeting = parseMeeting(newCourse.meets);
    for (const course of selectedCourses) {
      const currentMeeting = parseMeeting(course.meets);
      if (meetingsOverlap(newMeeting, currentMeeting)) {
        return false; // Overlap found
      }
    }
    return true; // No overlaps
  }
  
  export function getConflictingCourses(courses, selected) {
    const conflicts = {};
  
    Object.keys(courses).forEach(courseId => {
      const course = courses[courseId];
      if (canAddCourse(course, selected.map(id => courses[id]))) {
        conflicts[courseId] = false;
      } else {
        conflicts[courseId] = true;
      }
    });
  
    return conflicts;
  }
  