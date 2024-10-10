import Grid from "@mui/material/Unstable_Grid2"; // تأكد من استيراد Grid
import Divider from "@mui/material/Divider";
import { Prayer } from "./Prayer";
import { useState, useEffect } from 'react';
import CountrySelector from './CountrySelector';

const prayerTimesByCountry = {
  مصر: {
    الفجر: "04:10",
    الظهر: "12:00",
    العصر: "15:00",
    المغرب: "18:00",
    العشاء: "19:30",
  },
  السعودية: {
    الفجر: "05:00",
    الظهر: "12:15",
    العصر: "15:30",
    المغرب: "18:45",
    العشاء: "20:00",
  },
  الإمارات: {
    الفجر: "05:15",
    الظهر: "12:30",
    العصر: "15:45",
    المغرب: "19:00",
    العشاء: "20:15",
  },
  // يمكنك إضافة المزيد من الدول هنا
};

export const MainContent = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [prayerTimes, setPrayerTimes] = useState({});
  const [timeUntilNextPrayer, setTimeUntilNextPrayer] = useState("");
  const [nextPrayerName, setNextPrayerName] = useState("");

  useEffect(() => {
    if (selectedCountry) {
      setPrayerTimes(prayerTimesByCountry[selectedCountry]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    const calculateTimeUntilNextPrayer = () => {
      if (selectedCountry && prayerTimes) {
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes(); // الوقت الحالي بالدقائق

        const prayerTimesArray = Object.entries(prayerTimes).map(([name, time]) => {
          const [hours, minutes] = time.split(':').map(Number);
          return {
            name,
            timeInMinutes: hours * 60 + minutes,
          };
        });

        // إيجاد الصلاة التالية
        const nextPrayer = prayerTimesArray.find(prayer => prayer.timeInMinutes > currentTime);
        if (nextPrayer) {
          const remainingTime = nextPrayer.timeInMinutes - currentTime;
          const hoursLeft = Math.floor(remainingTime / 60);
          const minutesLeft = remainingTime % 60;
          const secondsLeft = (60 - now.getSeconds()) % 60; // لحساب الثواني المتبقية
          
          setNextPrayerName(nextPrayer.name); // تخزين اسم الصلاة التالية
          setTimeUntilNextPrayer(`${String(hoursLeft).padStart(2, '0')}:${String(minutesLeft).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}`);
        } else {
          setNextPrayerName(""); // لا توجد صلوات متبقية
          setTimeUntilNextPrayer("00:00:00");
        }
      }
    };

    const interval = setInterval(calculateTimeUntilNextPrayer, 1000); // تحديث كل ثانية
    return () => clearInterval(interval); // تنظيف الـ interval عند إلغاء التثبيت
  }, [selectedCountry, prayerTimes]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <div>
            <h2>متبقى حتى {nextPrayerName || 'الصلاة التالية'}</h2>
            <h1>{timeUntilNextPrayer}</h1>
          </div>
        </Grid>

        <Grid item xs={12} md={6} >
          <CountrySelector
            countries={Object.keys(prayerTimesByCountry)}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
          />
        </Grid>

      </Grid>

      <Divider />

      {selectedCountry && (


<Grid container spacing={2} justifyContent="center">
  <Grid item xs={12} sm={6} md={4} lg={3}>
    <Prayer title="صلاة الفجر" time={prayerTimes.الفجر} image="../img/dhhr-prayer-mosque.png" titleClass="prayer-title" timeClass="prayer-time" />
  </Grid>
  <Grid item xs={12} sm={6} md={4} lg={3}>
    <Prayer title="صلاة الظهر" time={prayerTimes.الظهر} image="../img/dhhr-prayer-mosque.png" titleClass="prayer-title" timeClass="prayer-time" />
  </Grid>
  <Grid item xs={12} sm={6} md={4} lg={3}>
    <Prayer title="صلاة العصر" time={prayerTimes.العصر} image="../img/dhhr-prayer-mosque.png" titleClass="prayer-title" timeClass="prayer-time" />
  </Grid>
  <Grid item xs={12} sm={6} md={4} lg={3}>
    <Prayer title="صلاة المغرب" time={prayerTimes.المغرب} image="../img/dhhr-prayer-mosque.png" titleClass="prayer-title" timeClass="prayer-time" />
  </Grid>
  <Grid item xs={12} sm={6} md={4} lg={3}>
    <Prayer title="صلاة العشاء" time={prayerTimes.العشاء} image="../img/dhhr-prayer-mosque.png" titleClass="prayer-title" timeClass="prayer-time" />
  </Grid>
</Grid>


      )}
    </>
  );
};
