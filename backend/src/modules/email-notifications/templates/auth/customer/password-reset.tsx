import * as React from 'react';
import { Text, Section, Link, Button, Img } from '@react-email/components';
import { Base } from '../../base';
import { PasswordResetRequest } from '../../../../../lib/types';

export const PASSWORD_RESET = 'password-reset';

type Props = {
    reset_url: string;
    publicUrl: string;
};

export const isPasswordResetTemplateData = (data: any): data is PasswordResetRequest =>
    typeof data.reset_url === 'string';

const PasswordResetEmail = ({ reset_url, publicUrl }: Props) => {
    return (
        <Base preview="Réinitialisez votre mot de passe">
            <Section className="mt-[32px]">
                <Img src={`${publicUrl}/RSPI_logo_email.png`} alt="RSPI" className="mx-auto w-28" />
            </Section>
            <Section>
                <Text
                    style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        margin: '32px 0 32px',
                    }}
                >
                    Réinitialisez votre mot de passe
                </Text>
            </Section>

            <Section>
                <Text className="text-black text-[14px] leading-[24px]">Bonjour,</Text>
                <Text className="text-black text-[14px] leading-[24px]">
                    Nous avons reçu une demande de réinitialisation de votre mot de passe. Cliquez
                    sur le bouton ci-dessous pour créer un nouveau mot de passe pour votre compte.
                </Text>
            </Section>

            <Section className="text-center mt-[32px] mb-[32px]">
                <Button
                    className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                    href={reset_url}
                >
                    Réinitialiser le mot de passe
                </Button>
            </Section>

            <Section className="my-[32px]">
                <Text className="text-black text-[14px] leading-[24px]">
                    Ou copiez et collez cette URL dans votre navigateur :
                </Text>
                <Link
                    href={reset_url}
                    className="text-blue-600 no-underline text-[14px] leading-[24px] break-all"
                >
                    {reset_url}
                </Link>
            </Section>

            <Section className="my-[32px]">
                <Text className="text-[#666666] text-[12px] leading-[24px]">
                    Pour des raisons de sécurité, ce lien de réinitialisation expirera bientôt.
                </Text>
                <Text className="text-[#666666] text-[12px] leading-[24px] mt-2">
                    Si vous n’avez pas demandé de réinitialisation, vous pouvez ignorer cet e-mail
                    en toute sécurité. Votre mot de passe restera inchangé.
                </Text>
            </Section>

            <Section className="mt-[32px] pt-[20px] border-t border-solid border-[#eaeaea]">
                <Text className="text-[#666666] text-[12px] leading-[24px]">
                    Pour des raisons de sécurité, ne partagez jamais ce lien de réinitialisation
                    avec qui que ce soit. Si vous rencontrez des problèmes avec le bouton ci-dessus,
                    copiez et collez l’URL dans votre navigateur.
                </Text>
            </Section>
        </Base>
    );
};

PasswordResetEmail.PreviewProps = {
    reset_url: 'http://localhost:9000',
    email: 'test@test.com',
    publicUrl: 'https://bucket-production-654a.up.railway.app/public',
};

export default PasswordResetEmail;
