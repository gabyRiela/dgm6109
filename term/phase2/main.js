"use strict"

let workoutData = [
    {
        date: "2025-09-29",
        workoutStartTime: "10:00 AM", //workout start time
        durationMinutes: 107, //workout duration in minutes
        activeKilocalories: 378, //active kilocalories burned during workout
        heartRateMin: 74, // BPM - lowest heart rate during workout
        heartRateMax: 165, // BPM - highest heart rate during workout
        energyLevelMorning: 2, //enery Level, scale: 2-Tired
        energyLevelAfterWorkout: 4,  //enery Level, scale: 4-Energetic
        energyLevelEndOfDay: 3 //enery Level, scale: 3-Ok 
    },
    {
        date: "2025-09-30",
        workoutStartTime: "10:01 AM",
        durationMinutes: 93,
        activeKilocalories: 313,
        heartRateMin: 76,
        heartRateMax: 162,
        energyLevelMorning: 3,
        energyLevelAfterWorkout: 2,
        energyLevelEndOfDay: 4
    },
    {
        date: "2025-10-01",
        workoutStartTime: "10:05 AM",
        durationMinutes: 108,
        activeKilocalories: 352,
        heartRateMin: 84,
        heartRateMax: 165,
        energyLevelMorning: 2,
        energyLevelAfterWorkout: 2,
        energyLevelEndOfDay: 3
    },
    {
        date: "2025-10-02",
        workoutStartTime: "10:19 AM",
        durationMinutes: 105,
        activeKilocalories: 312,
        heartRateMin: 76,
        heartRateMax: 156,
        energyLevelMorning: 3,
        energyLevelAfterWorkout: 1,//enery Level, scale: 1-Exhausted
        energyLevelEndOfDay: 4
    },
    {
        date: "2025-10-03",
        workoutStartTime: "9:57 AM",
        durationMinutes: 86,
        activeKilocalories: 386,
        heartRateMin: 84,
        heartRateMax: 175,
        energyLevelMorning: 1,
        energyLevelAfterWorkout: 3,
        energyLevelEndOfDay: 2
    },
    {
        date: "2025-10-06",
        workoutStartTime: "10:10 AM",
        durationMinutes: 106,
        activeKilocalories: 381,
        heartRateMin: 74,
        heartRateMax: 168,
        energyLevelMorning: 1,
        energyLevelAfterWorkout: 2,
        energyLevelEndOfDay: 2
    },
    {
        date: "2025-10-07",
        workoutStartTime: "10:08 AM",
        durationMinutes: 96,
        activeKilocalories: 285,
        heartRateMin: 73,
        heartRateMax: 144,
        energyLevelMorning: 1,
        energyLevelAfterWorkout: 3,
        energyLevelEndOfDay: 2
    },
    {
        date: "2025-10-08",
        workoutStartTime: "10:17 AM",
        durationMinutes: 118,
        activeKilocalories: 465,
        heartRateMin: 94,
        heartRateMax: 175,
        energyLevelMorning: 1,
        energyLevelAfterWorkout: 2,
        energyLevelEndOfDay: 3
    },
    {
        date: "2025-10-09",
        workoutStartTime: "9:45 AM",
        durationMinutes: 134,
        activeKilocalories: 382,
        heartRateMin: 71,
        heartRateMax: 160,
        energyLevelMorning: 3,
        energyLevelAfterWorkout: 2,
        energyLevelEndOfDay: 4
    },
    {
        date: "2025-10-10",
        workoutStartTime: "9:48 AM",
        durationMinutes: 86,
        activeKilocalories: 416,
        heartRateMin: 81,
        heartRateMax: 175,
        energyLevelMorning: 3,
        energyLevelAfterWorkout: 2,
        energyLevelEndOfDay: 3
    },
    {
        date: "2025-10-13",
        workoutStartTime: "9:58 AM",
        durationMinutes: 109,
        activeKilocalories: 406,
        heartRateMin: 89,
        heartRateMax: 172,
        energyLevelMorning: 5,//enery Level, scale: 5-Fully Energized
        energyLevelAfterWorkout: 5,
        energyLevelEndOfDay: 2
    },
    {
        date: "2025-10-14",
        workoutStartTime: "10:02 AM",
        durationMinutes: 105,
        activeKilocalories: 289,
        heartRateMin: 75,
        heartRateMax: 148,
        energyLevelMorning: 2,
        energyLevelAfterWorkout: 2,
        energyLevelEndOfDay: 2
    },
    {
        date: "2025-10-15",
        workoutStartTime: "10:04 AM",
        durationMinutes: 106,
        activeKilocalories: 359,
        heartRateMin: 82,
        heartRateMax: 162,
        energyLevelMorning: 3,
        energyLevelAfterWorkout: 2,
        energyLevelEndOfDay: 1
    },
    {
        date: "2025-10-16",
        workoutStartTime: "10:10 AM",
        durationMinutes: 114,
        activeKilocalories: 328,
        heartRateMin: 75,
        heartRateMax: 149,
        energyLevelMorning: 1,
        energyLevelAfterWorkout: 2,
        energyLevelEndOfDay: 2
    },
    {
        date: "2025-10-17",
        workoutStartTime: "10:02 AM",
        durationMinutes: 101,
        activeKilocalories: 489,
        heartRateMin: 97,
        heartRateMax: 178,
        energyLevelMorning: 3,
        energyLevelAfterWorkout: 4,
        energyLevelEndOfDay: 4
    },
    {
        date: "2025-10-20",
        workoutStartTime: "9:38 AM",
        durationMinutes: 111,
        activeKilocalories: 414,
        heartRateMin: 80,
        heartRateMax: 175,
        energyLevelMorning: 4,
        energyLevelAfterWorkout: 4,
        energyLevelEndOfDay: 4
    },
    {
        date: "2025-10-21",
        workoutStartTime: "10:05 AM",
        durationMinutes: 118,
        activeKilocalories: 343,
        heartRateMin: 77,
        heartRateMax: 155,
        energyLevelMorning: 2,
        energyLevelAfterWorkout: 3,
        energyLevelEndOfDay: undefined // NA in original data - data not collected this day
    },
     {
        date: "2025-10-23",
        workoutStartTime: "10:17 AM",
        durationMinutes: 120,
        activeKilocalories: 392,
        heartRateMin: 78,
        heartRateMax: 166,
        energyLevelMorning: 1,
        energyLevelAfterWorkout: 2,
        energyLevelEndOfDay: 2
    },
      {
        date: "2025-10-24",
        workoutStartTime: "10:21 AM",
        durationMinutes: 111,
        activeKilocalories: 445,
        heartRateMin: 63,
        heartRateMax: 162,
        energyLevelMorning: 1,
        energyLevelAfterWorkout: 1,
        energyLevelEndOfDay: 2
    }
]; // list of workout data collected during the week from "2025-09-29"-"2025-10-24" (Monday to Friday)



//console.log(JSON.stringify(workoutData));
showData(workoutData);
