export class CoursesProcessor {
  course;

  constructor(course) {
    this.course = course;
  }

  fontNine() {
    return this.course.filter(h => h.hole <= 9);
  }

  backNine() {
    return this.course.filter(h => h.hole > 9);
  }

  eighteenStart1() {
    return this.course;
  }

  eighteenStart10() {
    const a = this.fontNine();
    const b = this.backNine();
    return [...b, ...a];
  }

  courseFactory(type) {
    switch (type) {
      case 'F':
        return this.fontNine();
      case 'B':
        return this.backNine();
      case 'A10':
        return this.eighteenStart10();
      default:
        return this.eighteenStart1();
    }
  }
}
