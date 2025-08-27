const handleSave = async () => {
  // ... существующая валидация ...

  setLoading(true);
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not found');

    const updateData = {
      age: ageValue,
      gender: formData.gender,
      diagnosis: formData.diagnosis,
      diagnosis_duration: durationValue,
      morning_stiffness: stiffnessValue,
      pain_level: painValue,
      updated_at: new Date().toISOString()
    };

    console.log('Saving to Supabase:', updateData); // ← ДОБАВЬТЕ ЭТО

    const { error } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', user.id);

    if (error) {
      console.error('Supabase error:', error); // ← ДОБАВЬТЕ ЭТО
      throw error;
    }

    Alert.alert('Успешно', 'Данные сохранены!');
    router.replace('/(tabs)/chat');

  } catch (error) {
    console.error('Save error:', error); // ← ДОБАВЬТЕ ЭТО
    Alert.alert('Ошибка', 'Не удалось сохранить данные');
  } finally {
    setLoading(false);
  }
};
