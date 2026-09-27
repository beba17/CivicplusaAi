import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { useColors } from '@/hooks/useColors';
import { useCitizen } from '@/context/CitizenContext';

const languages = ['Hindi', 'English', 'Marwari', 'Bengali'];

export default function ReportScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { addRequest } = useCitizen();
  const [language, setLanguage] = useState('Hindi');
  const [channel, setChannel] = useState<'Voice' | 'Text'>('Voice');
  const [text, setText] = useState('');
  const [recording, setRecording] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const styles = makeStyles(colors);

  const toggleRecording = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setRecording((current) => !current);
    if (!recording) setText('');
  };

  const submit = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await addRequest({
      title: 'Reliable drinking water needed',
      quote: text.trim() || '“Voice note captured — local need shared with JanSetu.”',
      category: 'Water access',
      location: 'Kalyanpur, Rajasthan',
      language,
      channel,
    });
    setSubmitted(true);
  };

  if (submitted) {
    return <View style={[styles.successScreen, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 }]}><View style={styles.successIcon}><Feather name="check" size={32} color={colors.primaryForeground} /></View><Text style={styles.successTitle}>Your voice is now part of the signal.</Text><Text style={styles.successBody}>JanSetu has saved your request in {language}. Planners can now see the need, the location, and the evidence behind it.</Text><View style={styles.receipt}><Text style={styles.receiptLabel}>REQUEST RECEIVED</Text><Text style={styles.receiptTitle}>Reliable drinking water needed</Text><Text style={styles.receiptMeta}>{language}  ·  {channel}  ·  Kalyanpur, Rajasthan</Text></View><Pressable onPress={() => router.replace('/(tabs)/requests')} style={styles.primaryButton}><Text style={styles.primaryButtonText}>See my request</Text><Feather name="arrow-right" size={18} color={colors.primaryForeground} /></Pressable><Pressable onPress={() => router.replace('/(tabs)')}><Text style={styles.secondaryAction}>Back to home</Text></Pressable></View>;
  }

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 14, paddingBottom: insets.bottom + 24 }]} keyboardShouldPersistTaps="handled">
        <View style={styles.modalTop}><Pressable testID="close-report" onPress={() => router.back()} style={styles.close}><Feather name="x" size={22} color={colors.foreground} /></Pressable><Text style={styles.modalLabel}>SHARE A NEED</Text><View style={{ width: 42 }} /></View>
        <Text style={styles.title}>What should planners know?</Text>
        <Text style={styles.subtitle}>Use the language and channel that feels easiest. Your original words stay attached.</Text>

        <Text style={styles.fieldLabel}>Your language</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {languages.map((item) => <Pressable key={item} onPress={() => setLanguage(item)} style={[styles.chip, language === item && styles.chipSelected]}><Text style={[styles.chipText, language === item && styles.chipTextSelected]}>{item}</Text></Pressable>)}
        </ScrollView>

        <Text style={styles.fieldLabel}>How do you want to share?</Text>
        <View style={styles.channelRow}>
          <Pressable onPress={() => setChannel('Voice')} style={[styles.channel, channel === 'Voice' && styles.channelSelected]}><Feather name="mic" size={20} color={channel === 'Voice' ? colors.coral : colors.mutedForeground} /><Text style={styles.channelTitle}>Voice note</Text><Text style={styles.channelHint}>Speak naturally</Text></Pressable>
          <Pressable onPress={() => setChannel('Text')} style={[styles.channel, channel === 'Text' && styles.channelSelected]}><Feather name="edit-3" size={20} color={channel === 'Text' ? colors.teal : colors.mutedForeground} /><Text style={styles.channelTitle}>Text</Text><Text style={styles.channelHint}>Type your need</Text></Pressable>
        </View>

        {channel === 'Voice' ? <View style={styles.voicePanel}><View style={styles.wave}><View style={[styles.waveBar, { height: recording ? 28 : 12, backgroundColor: colors.coral }]} /><View style={[styles.waveBar, { height: recording ? 45 : 18, backgroundColor: colors.coral }]} /><View style={[styles.waveBar, { height: recording ? 34 : 25, backgroundColor: colors.coral }]} /><View style={[styles.waveBar, { height: recording ? 52 : 15, backgroundColor: colors.coral }]} /><View style={[styles.waveBar, { height: recording ? 26 : 20, backgroundColor: colors.coral }]} /><View style={[styles.waveBar, { height: recording ? 40 : 12, backgroundColor: colors.coral }]} /></View><Pressable onPress={toggleRecording} style={[styles.recordButton, recording && styles.recording]}><Feather name={recording ? 'square' : 'mic'} size={20} color={colors.primaryForeground} /><Text style={styles.recordButtonText}>{recording ? 'Stop demo recording' : 'Start voice note'}</Text></Pressable><Text style={styles.voiceHint}>{recording ? 'Listening for your local need…' : 'Demo capture: a real voice recorder can be connected for pilot deployment.'}</Text></View> : <TextInput testID="request-text-input" value={text} onChangeText={setText} placeholder="Tell us what is difficult in your area…" placeholderTextColor={colors.mutedForeground} multiline style={styles.input} />}

        <View style={styles.consent}><Feather name="shield" size={17} color={colors.teal} /><Text style={styles.consentText}>I consent to share this request with public planning teams. Sensitive personal details are not needed.</Text></View>
        <Pressable testID="submit-request" onPress={submit} style={({ pressed }) => [styles.primaryButton, pressed && { opacity: 0.8 }]}><Text style={styles.primaryButtonText}>Send to JanSetu</Text><Feather name="arrow-up-right" size={19} color={colors.primaryForeground} /></Pressable>
      </ScrollView>
    </View>
  );
}

function makeStyles(colors: ReturnType<typeof useColors>) {
  return StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    content: { paddingHorizontal: 20, gap: 14 },
    modalTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
    close: { width: 42, height: 42, borderRadius: 14, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
    modalLabel: { color: colors.teal, fontSize: 11, fontWeight: '800', letterSpacing: 2 },
    title: { color: colors.foreground, fontSize: 29, lineHeight: 34, fontWeight: '800', letterSpacing: -0.6 },
    subtitle: { color: colors.mutedForeground, fontSize: 14, lineHeight: 20, marginBottom: 8 },
    fieldLabel: { color: colors.foreground, fontSize: 13, fontWeight: '800', marginTop: 5 },
    chips: { gap: 8, paddingVertical: 4 },
    chip: { borderRadius: 30, paddingHorizontal: 15, paddingVertical: 10, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
    chipSelected: { backgroundColor: colors.ink, borderColor: colors.ink },
    chipText: { color: colors.mutedForeground, fontSize: 13, fontWeight: '700' },
    chipTextSelected: { color: colors.sand },
    channelRow: { flexDirection: 'row', gap: 10 },
    channel: { flex: 1, borderRadius: 16, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, padding: 15, gap: 6 },
    channelSelected: { borderColor: colors.coral, backgroundColor: `${colors.coral}0D` },
    channelTitle: { color: colors.foreground, fontSize: 14, fontWeight: '800' },
    channelHint: { color: colors.mutedForeground, fontSize: 12 },
    voicePanel: { borderRadius: 18, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, padding: 16, alignItems: 'center', gap: 13 },
    wave: { height: 58, flexDirection: 'row', alignItems: 'center', gap: 7 },
    waveBar: { width: 7, borderRadius: 4 },
    recordButton: { width: '100%', minHeight: 50, borderRadius: 14, backgroundColor: colors.ink, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 9 },
    recording: { backgroundColor: colors.coral },
    recordButtonText: { color: colors.primaryForeground, fontSize: 14, fontWeight: '800' },
    voiceHint: { color: colors.mutedForeground, fontSize: 11, lineHeight: 16, textAlign: 'center' },
    input: { minHeight: 140, borderRadius: 18, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.card, color: colors.foreground, padding: 16, fontSize: 15, lineHeight: 22, textAlignVertical: 'top' },
    consent: { flexDirection: 'row', gap: 9, alignItems: 'flex-start', paddingVertical: 8 },
    consentText: { color: colors.mutedForeground, fontSize: 12, lineHeight: 17, flex: 1 },
    primaryButton: { minHeight: 54, borderRadius: 15, backgroundColor: colors.coral, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, paddingHorizontal: 18, marginTop: 4 },
    primaryButtonText: { color: colors.primaryForeground, fontSize: 15, fontWeight: '800', flex: 1 },
    successScreen: { flex: 1, backgroundColor: colors.background, paddingHorizontal: 24, justifyContent: 'center', gap: 18 },
    successIcon: { width: 66, height: 66, borderRadius: 22, backgroundColor: colors.teal, alignItems: 'center', justifyContent: 'center' },
    successTitle: { color: colors.foreground, fontSize: 31, lineHeight: 36, fontWeight: '800', letterSpacing: -0.6 },
    successBody: { color: colors.mutedForeground, fontSize: 15, lineHeight: 22 },
    receipt: { backgroundColor: colors.card, borderRadius: 18, borderWidth: 1, borderColor: colors.border, padding: 17, gap: 7 },
    receiptLabel: { color: colors.teal, fontSize: 10, fontWeight: '800', letterSpacing: 1.7 },
    receiptTitle: { color: colors.foreground, fontSize: 15, fontWeight: '800' },
    receiptMeta: { color: colors.mutedForeground, fontSize: 12 },
    secondaryAction: { textAlign: 'center', color: colors.teal, fontSize: 14, fontWeight: '800', paddingVertical: 10 },
  });
}