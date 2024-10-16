function skillsMember() {
  return {
    name: 'Jhon Doe',
    age: 30,
    skills: ['JavaScript', 'React.js', 'Node.js'],
    // Method
    getSkills: function() {
      return this.skills;
    }
  };
}