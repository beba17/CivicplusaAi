import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { useCitizen } from '@/context/CitizenContext';

export default function RequestsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { requests } = useCitizen();
  const styles = makeStyles(colors);

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 18, paddingBottom: insets.bottom + 96 }]} showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>MY SIGNALS</Text>
        <Text style={styles.title}>Requests you have shared</Text>
        <Text style={styles.subtitle}>Follow what happens after your voice reaches the planning team.</Text>
        <View style={styles.summary}><View><Text style={styles.summaryNumber}>{requests.length}</Text><Text style={styles.summaryLabel}>requests on this device</Text></View><View style={styles.summaryIcon}><Feather name="activity" size={20} color={colors.teal} /></View></View>
        {requests.map((request) => (
          <RequestCard key={request.id} request={request} colors={colors} />
        ))}
      </ScrollView>
    </View>
  );
}

function RequestCard({ request, colors }: { request: ReturnType<typeof useCitizen>['requests'][number]; colors: ReturnType<typeof useColors> }) {
  const styles = makeStyles(colors);
  const statusColor = request.status === 'Under review' ? colors.coral : colors.teal;
  return (
    <Pressable testID={`request-${request.id}`} style={({ pressed }) => [styles.requestCard, pressed && { opacity: 0.82 }]}>
      <View style={styles.requestHeader}><View style={[styles.channelIcon, { backgroundColor: `${statusColor}1F` }]}><Feather name={request.channel === 'Voice' ? 'mic' : 'edit-3'} size={17} color={statusColor} /></View><View style={styles.requestTitleWrap}><Text style={styles.requestTitle}>{request.title}</Text><Text style={styles.requestMeta}>{request.location}  ·  {request.language}</Text></View><Feather name="chevron-right" size={18} color={colors.mutedForeground} /></View>
      <Text style={styles.requestQuote}>{request.quote}</Text>
      <View style={styles.timeline}><LineStep label="Received" active={true} colors={colors} /><LineStep label="Structured" active={request.status !== 'Received'} colors={colors} /><LineStep label="Under review" active={request.status === 'Under review' || request.status === 'Resolved'} colors={colors} /></View>
      <Text style={[styles.statusText, { color: statusColor }]}>{request.status}  ·  Demo update</Text>
    </Pressable>
  );
}

function LineStep({ label, active, colors }: { label: string; active: boolean; colors: ReturnType<typeof useColors> }) {
  return <View style={stylesLine.step}><View style={[stylesLine.dot, { backgroundColor: active ? colors.teal : colors.border }]} /><Text style={[stylesLine.label, { color: active ? colors.foreground : colors.mutedForeground }]}>{label}</Text></View>;
}

const stylesLine = StyleSheet.create({ step: { flex: 1, gap: 6 }, dot: { height: 6, borderRadius: 3 }, label: { fontSize: 10, fontWeight: '700' } });

function makeStyles(colors: ReturnType<typeof useColors>) {
  return StyleSheet.create({
    screen: { flex: 1, backgroundColor: colors.background },
    content: { paddingHorizontal: 20, gap: 14 },
    eyebrow: { color: colors.teal, fontSize: 11, fontWeight: '800', letterSpacing: 2.2 },
    title: { color: colors.foreground, fontSize: 27, lineHeight: 32, fontWeight: '800', marginTop: 4 },
    subtitle: { color: colors.mutedForeground, fontSize: 14, lineHeight: 20, maxWidth: 340 },
    summary: { backgroundColor: colors.secondary, borderRadius: 18, padding: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 },
    summaryNumber: { color: colors.foreground, fontSize: 30, fontWeight: '800' },
    summaryLabel: { color: colors.mutedForeground, fontSize: 12, marginTop: 3 },
    summaryIcon: { width: 42, height: 42, borderRadius: 14, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center' },
    requestCard: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 18, padding: 16, gap: 13 },
    requestHeader: { flexDirection: 'row', alignItems: 'center', gap: 11 },
    channelIcon: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    requestTitleWrap: { flex: 1, gap: 4 },
    requestTitle: { color: colors.foreground, fontSize: 14, fontWeight: '800' },
    requestMeta: { color: colors.mutedForeground, fontSize: 11 },
    requestQuote: { color: colors.foreground, opacity: 0.72, fontSize: 13, fontStyle: 'italic', lineHeight: 18 },
    timeline: { flexDirection: 'row', gap: 8 },
    statusText: { fontSize: 11, fontWeight: '800' },
  });
}