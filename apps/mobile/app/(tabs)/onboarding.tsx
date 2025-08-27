const handleSave = async () => {
  // ... валидация ...

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

    // ТЕСТОВОЕ СООБЩЕНИЕ
    Alert.alert('Данные для сохранения', JSON.stringify(updateData, null, 2));

    const { error } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', user.id);

    if (error) throw error;

    Alert.alert('Успешно', 'Данные сохранены в Supabase!');
    router.replace('/(tabs)/chat');

  } catch (error) {
    console.error('Save error:', error);
    Alert.alert('Ошибка', error.message || 'Не удалось сохранить данные');
  } finally {
    setLoading(false);
  }
};
