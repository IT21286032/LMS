const OpenAI = require('openai');
const Course = require('../models/Course');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

exports.getRecommendations = async (req, res) => {
  const { prompt } = req.body;

  try {
    // Fetch all courses from the database
    const courses = await Course.find();

    // Prepare a list of course titles, descriptions, and instructors
    const courseData = courses.map(course => ({
      title: course.title,
      description: course.description,
      instructor: course.instructor,
    }));

    // Create a message for the GPT-3 model with course data
    const message = {
      role: 'user',
      content: `Here is a list of courses with their descriptions and instructors:\n\n${courseData.map(course => `Title: ${course.title}\nDescription: ${course.description}\nInstructor: ${course.instructor}\n`).join('\n')}Based on the following prompt, recommend some courses from the above mentioned courses. Output the course title and instructor in the format: "Course Title: by Instructor Name". The prompt is: "${prompt}"`,
    };

    // Log the message for debugging
    //console.log('Message for GPT-3:', message);

    // Get recommendations from GPT-3
    const chatCompletion = await client.chat.completions.create({
      messages: [message],
      model: 'gpt-3.5-turbo',
    });

    const recommendations = chatCompletion.choices[0].message.content.trim();

    // Log the recommendations for debugging
    console.log('Recommendations:', recommendations);

    // Send the recommendations directly as a response
    res.json({ recommendations });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
