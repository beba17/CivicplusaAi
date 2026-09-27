import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { useCitizen } from '@/context/CitizenContext';

export default function CitizenHome() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { requests } = useCitizen();
  const latest = requests[0];
  const styles = makeStyles(colors);

  const openReport = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/report');
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 18, paddingBottom: insets.bottom + 98 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topRow}>
          <View>
            <Text style={styles.eyebrow}>JANSETU AI</Text>
            <Text style={styles.greeting}>Namaste, Ananya</Text>
          </View>
          <View style={styles.avatar}><Text style={styles.avatarText}>AK</Text></View>
        </View>

        <View style={styles.hero}>
          <View style={styles.heroOrb}><MaterialCommunityIcons name="bridge" size={34} color={colors.ink} /></View>
          <Text style={styles.heroTitle}>Your voice can shape what gets built next.</Text>
          <Text style={styles.heroBody}>Share a local infrastructure need in the language that feels natural. JanSetu helps planners understand the signal.</Text>
          <Pressable testID="capture-signal" onPress={openReport} style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}>
            <Feather name="mic" size={18} color={colors.primaryForeground} />
            <Text style={styles.primaryButtonText}>Share a need</Text>
            <Feather name="arrow-up-right" size={18} color={colors.primaryForeground} />
          </Pressable>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your signal loop</Text>
          <Text style={styles.sectionHint}>What happens next</Text>
        </View>
        <View style={styles.loopCard}>
          <Step icon="mic" label="You share" detail="Voice or text" color={colors.coral} />
          <Feather name="chevron-right" size={16} color={colors.mutedForeground} />
          <Step icon="cpu" label="JanSetu structures" detail="Language preserved" color={colors.teal} />
          <Feather name="chevron-right" size={16} color={colors.mutedForeground} />
          <Step icon="map-pin" label="Planners see" detail="Demand hotspot" color={colors.success} />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Latest update</Text>
          <Pressable onPress={() => router.push('/(tabs)/requests')}><Text style={styles.link}>View all</Text></Pressable>
        </View>
        <View style={styles.updateCard}>
          <View style={[styles.statusDot, { backgroundColor: colors.teal }]} />
          <View style={styles.updateCopy}>
            <Text style={styles.updateTitle}>{latest?.title ?? 'No requests yet'}</Text>
            <Text style={styles.updateMeta}>{latest?.location ?? 'Share your first local need'}  ·  {latest?.status ?? 'Ready to start'}</Text>
            {latest ? <Text style={styles.updateQuote}>{latest.quote}</Text> : null}
          </View>
          <Feather name="chevron-right" size={18} color={colors.mutedForeground} />
        </View>

        <View style={styles.demoNote}>
          <Feather name="info" size={16} color={colors.teal} />
          <Text style={styles.demoText}>Demo mode: this prototype stores your requests on this device.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

function Step({ icon, label, detail, color }: { icon: keyof typeof Feather.glyphMap; label: string; detail: string; color: string }) {
  const colors = useColors();
  return <View style={stylesStep.step}><View style={[stylesStep.icon, { backgroundColor: `${color}22` }]}><Feather name={icon} size={16} color={color} /></View><Text style={[stylesStep.label, { color: colors.foreground }]}>{label}</Text><Text style={[stylesStep.detail, { color: colors.mutedForeground }]}>{detail}</Text></View>;
}

const stylesStep = StyleSheet.create({
  step: { flex: 1, gap: 5 },
  icon: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  label: { fontSize: 12, fontWeight: '700' },
  detail: { fontSize: 11 },
});

function makeStyles(colors: ReturnType<typeof useColors>) {
  return StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    content: { paddingHorizontal: 20, gap: 20 },
    topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    eyebrow: { color: colors.teal, fontSize: 11, fontWeight: '800', letterSpacing: 2.2 },
    greeting: { color: colors.foreground, fontSize: 23, fontWeight: '700', marginTop: 6 },
    avatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: colors.coral, alignItems: 'center', justifyContent: 'center' },
    avatarText: { color: colors.ink, fontWeight: '800', fontSize: 13 },
    hero: { backgroundColor: colors.ink, borderRadius: 24, padding: 22, overflow: 'hidden' },
    heroOrb: { width: 56, height: 56, borderRadius: 18, backgroundColor: colors.coral, alignItems: 'center', justifyContent: 'center', marginBottom: 22 },
    heroTitle: { color: colors.sand, fontSize: 29, lineHeight: 33, fontWeight: '700', letterSpacing: -0.8 },
    heroBody: { color: colors.sand, opacity: 0.72, fontSize: 15, lineHeight: 21, marginTop: 12 },
    primaryButton: { marginTop: 22, backgroundColor: colors.coral, borderRadius: 14, minHeight: 52, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16 },
    primaryButtonText: { color: colors.primaryForeground, fontSize: 15, fontWeight: '800', flex: 1 },
    pressed: { opacity: 0.8 },
    sectionHeader: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' },
    sectionTitle: { color: colors.foreground, fontSize: 17, fontWeight: '800' },
    sectionHint: { color: colors.mutedForeground, fontSize: 12 },
    link: { color: colors.teal, fontSize: 13, fontWeight: '800' },
    loopCard: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 18, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 8 },
    updateCard: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 18, padding: 16, flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
    statusDot: { width: 10, height: 10, borderRadius: 5, marginTop: 5 },
    updateCopy: { flex: 1, gap: 5 },
    updateTitle: { color: colors.foreground, fontSize: 14, fontWeight: '800' },
    updateMeta: { color: colors.mutedForeground, fontSize: 12 },
    updateQuote: { color: colors.foreground, opacity: 0.72, fontSize: 13, fontStyle: 'italic', lineHeight: 18, marginTop: 5 },
    demoNote: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 2 },
    demoText: { color: colors.mutedForeground, fontSize: 12, flex: 1, lineHeight: 17 },
  });
}