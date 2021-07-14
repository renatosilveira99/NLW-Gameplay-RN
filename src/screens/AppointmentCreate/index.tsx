import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler'
import { Background } from '../../components/Background';
import { ModalView } from '../../components/ModalView';
import { CategorySelect } from '../../components/CategorySelect';
import { Header } from '../../components/Header';
import { SmallInput } from '../../components/SmallInput';
import { Button } from '../../components/Button';
import { TextArea } from '../../components/TextArea';
import { GuildIcon } from '../../components/GuildIcon';
import { Guilds } from '../Guilds';
import { theme } from '../../global/styles/theme';
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { styles } from './styles';
import { GuildProps } from '../../components/Guild';

export function AppointmentCreate() {
  const [category, setCategory] = useState('')
  const [openGuildsModal, setOpenGuildsModal] = useState(false);
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

  function handleOpenGuilds() {
    setOpenGuildsModal(true)
  }
  function handleCloseGuilds() {
    setOpenGuildsModal(false)
  }
  function handleGuildSelect(guildSelected: GuildProps) {
    setGuild(guildSelected)
    setOpenGuildsModal(false)
  }

  function handleCategorySelect(categoryId: string) {
    setCategory(categoryId)
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Background>
        <ScrollView>
          <Header
            title="Agendar Partida"
          />

          <Text style={[styles.label, {
            marginLeft: 24,
            marginTop: 36,
            marginBottom: 18
          }]}>
            Categoria
          </Text>

          <CategorySelect
            hasCheckBox
            setCategory={handleCategorySelect}
            categorySelected={category}
          />

          <View style={styles.form}>
            <RectButton onPress={handleOpenGuilds}>


              <View style={styles.select}>
                {
                  guild.icon
                    ? <GuildIcon /> : <View style={styles.image} />
                }

                <View style={styles.selectBody}>
                  <Text style={styles.label}>
                    {guild.name ? guild.name : 'Selecione um servidor'}
                  </Text>
                </View>

                <Feather
                  name='chevron-right'
                  color={theme.colors.heading}
                  size={18}
                />

              </View>
            </RectButton>

            <View style={styles.field}>
              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>
                  Dia e mês
                </Text>

                <View style={styles.column}>
                  <SmallInput maxLength={2} />
                  <Text style={styles.divider}>
                    /
                  </Text>
                  <SmallInput maxLength={2} />
                </View>
              </View>

              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>
                  Hora e minuto
                </Text>

                <View style={styles.column}>
                  <SmallInput maxLength={2} />
                  <Text style={styles.divider}>
                    :
                  </Text>
                  <SmallInput maxLength={2} />
                </View>
              </View>
            </View>

            <View style={[styles.field, {
              marginBottom: 12
            }]}>
              <Text style={styles.label}>
                Desrição
              </Text>
              <Text style={styles.caracteresLimit}>
                Max 100 caracteres
              </Text>
            </View>

            <TextArea
              multiline
              maxLength={100}
              numberOfLines={5}
              autoCorrect={false}
            />

            <View style={styles.footer}>
              <Button title="Agendar" />
            </View>

          </View>

        </ScrollView>
      </Background>
      <ModalView visible={openGuildsModal} closeModal={handleCloseGuilds}>
        <Guilds handleGuildSelect={handleGuildSelect} />
      </ModalView>


    </KeyboardAvoidingView>
  )
}